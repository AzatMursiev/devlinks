<?php
// Projects API for /links.
//   GET  — returns projects. Private ones ONLY when the admin PIN session is active.
//   POST — replaces the whole list (admin session required). Body: JSON array.
// Storage lives OUTSIDE the webroot so private entries are never directly fetchable.

require '/var/www/links-private/auth.php';
dl_session_start();

define('DL_PROJECTS_FILE', '/var/www/links-private/projects.json');

$authed = !empty($_SESSION['auth'])
       && (time() - ($_SESSION['login_time'] ?? 0) < DL_SESSION_TTL);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');
header('X-Robots-Tag: noindex, nofollow');
header('X-DL-Auth: ' . ($authed ? '1' : '0'));

function dl_projects_read() {
    if (!is_file(DL_PROJECTS_FILE)) return [];
    $j = json_decode((string)@file_get_contents(DL_PROJECTS_FILE), true);
    return is_array($j) ? $j : [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Session cookie is SameSite=Lax, so a cross-site POST carries no session -> CSRF-safe.
    if (!$authed) {
        http_response_code(403);
        echo json_encode(['error' => 'auth required']);
        exit;
    }
    $data = json_decode((string)file_get_contents('php://input'), true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['error' => 'expected a JSON array']);
        exit;
    }
    $tmp = DL_PROJECTS_FILE . '.tmp';
    $ok = @file_put_contents(
        $tmp,
        json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT),
        LOCK_EX
    );
    if ($ok === false || !@rename($tmp, DL_PROJECTS_FILE)) {
        @unlink($tmp);
        http_response_code(500);
        echo json_encode(['error' => 'write failed']);
        exit;
    }
    @chmod(DL_PROJECTS_FILE, 0660);
    echo json_encode(['ok' => true, 'count' => count($data)]);
    exit;
}

$list = dl_projects_read();
if (!$authed) {
    $list = array_values(array_filter($list, function ($p) {
        return empty($p['private']);
    }));
}
echo json_encode($list, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
