<?php
require '/var/www/links-private/auth.php';
dl_session_start();

if (empty($_SESSION['auth']) || (time() - ($_SESSION['login_time'] ?? 0) >= DL_SESSION_TTL)) {
    $_SESSION = [];
    @session_destroy();
    header('Location: login.php');
    exit;
}

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store, private');
header('X-Robots-Tag: noindex, nofollow');
readfile(DL_PANEL);
