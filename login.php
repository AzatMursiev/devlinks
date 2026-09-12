<?php
require '/var/www/links-private/auth.php';
dl_session_start();

// Already authenticated → straight to the panel
if (!empty($_SESSION['auth']) && (time() - ($_SESSION['login_time'] ?? 0) < DL_SESSION_TTL)) {
    header('Location: admin.php');
    exit;
}

if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(16));
}

function dl_throttle_read() {
    if (!is_file(DL_THROTTLE)) return [];
    $j = json_decode(@file_get_contents(DL_THROTTLE), true);
    return is_array($j) ? $j : [];
}
function dl_throttle_write($d) {
    @file_put_contents(DL_THROTTLE, json_encode($d), LOCK_EX);
}

$ip   = $_SERVER['REMOTE_ADDR'] ?? '0';
$now  = time();
$th   = dl_throttle_read();
$rec  = $th[$ip] ?? ['fails' => 0, 'lock_until' => 0];
$error = '';
$locked = ($rec['lock_until'] ?? 0) > $now;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($locked) {
        $error = 'Слишком много попыток. Подождите немного.';
    } else {
        $okCsrf = hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '');
        $pin = (string)($_POST['pin'] ?? '');
        if ($okCsrf && password_verify($pin, DL_PIN_HASH)) {
            unset($th[$ip]);
            dl_throttle_write($th);
            session_regenerate_id(true);
            $_SESSION['auth'] = true;
            $_SESSION['login_time'] = time();
            $_SESSION['csrf'] = bin2hex(random_bytes(16));
            header('Location: admin.php');
            exit;
        }
        $rec['fails'] = ($rec['fails'] ?? 0) + 1;
        if ($rec['fails'] >= DL_MAX_FAILS) {
            $rec['lock_until'] = $now + DL_LOCK_SECONDS;
            $rec['fails'] = 0;
            $locked = true;
        }
        $th[$ip] = $rec;
        dl_throttle_write($th);
        $error = $okCsrf ? 'Неверный PIN' : 'Сессия устарела, попробуйте ещё раз';
    }
}

$wait = max(0, ($rec['lock_until'] ?? 0) - $now);
$csrf = $_SESSION['csrf'];
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
?>
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Вход · devlinks admin</title>
<link rel="icon" type="image/svg+xml" href="icons/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#eef0f8; --card:#ffffff; --field:#f6f7fc;
    --border:#e3e6f1; --border-strong:#d3d7e8;
    --text:#15161d; --muted:#646a7d; --muted2:#9b9fb2;
    --accent:#5b5bf0; --accent2:#8b5cf6;
    --accent-soft:color-mix(in oklab, var(--accent) 12%, transparent);
    --danger:#c43b3b; --danger-bg:#fdeaea;
    --shadow:0 1px 2px rgba(20,22,50,.05), 0 18px 50px rgba(20,22,50,.12);
  }
  @media (prefers-color-scheme: dark){
    :root{
      --bg:#0b0c12; --card:#14151e; --field:#1a1c27;
      --border:#262835; --border-strong:#343748;
      --text:#e9eaf1; --muted:#969aac; --muted2:#666a7d;
      --danger:#fca5a5; --danger-bg:rgba(196,59,59,.2);
      --shadow:0 1px 2px rgba(0,0,0,.4), 0 24px 60px rgba(0,0,0,.55);
    }
  }
  *{box-sizing:border-box;}
  html,body{margin:0;height:100%;}
  body{font-family:'Manrope',system-ui,sans-serif;background:
       radial-gradient(1200px 600px at 50% -10%, color-mix(in oklab,var(--accent) 16%, var(--bg)), var(--bg));
       color:var(--text);display:flex;align-items:center;justify-content:center;padding:24px;-webkit-font-smoothing:antialiased;}
  .card{width:100%;max-width:360px;background:var(--card);border:1px solid var(--border);border-radius:22px;
        box-shadow:var(--shadow);padding:30px 26px 26px;text-align:center;}
  .logo{width:52px;height:52px;border-radius:15px;margin:0 auto 16px;
        background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;
        box-shadow:0 10px 24px var(--accent-soft);}
  h1{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;margin:0 0 4px;letter-spacing:-.3px;}
  .sub{font-size:13px;color:var(--muted);margin:0 0 22px;}
  .dots{display:flex;gap:13px;justify-content:center;margin-bottom:8px;height:18px;}
  .dot{width:14px;height:14px;border-radius:50%;border:2px solid var(--border-strong);transition:all .12s;}
  .dot.on{background:var(--accent);border-color:var(--accent);transform:scale(1.05);}
  .err{min-height:20px;font-size:13px;font-weight:600;color:var(--danger);margin:8px 0 6px;}
  .pad{display:grid;grid-template-columns:repeat(3,1fr);gap:11px;margin-top:6px;}
  .key{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:600;height:60px;border-radius:15px;
       border:1px solid var(--border);background:var(--field);color:var(--text);cursor:pointer;
       transition:transform .08s, background .12s, border-color .12s;user-select:none;}
  .key:hover{border-color:var(--accent);}
  .key:active{transform:scale(.95);background:var(--accent-soft);}
  .key.wide{grid-column:span 1;font-size:15px;font-weight:700;}
  .enter{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border:none;}
  .enter:hover{filter:brightness(1.05);}
  .ghost{background:transparent;border:1px solid transparent;color:var(--muted);}
  .ghost:hover{border-color:var(--border);}
  .shake{animation:shake .4s;}
  @keyframes shake{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}30%,50%,70%{transform:translateX(-7px)}40%,60%{transform:translateX(7px)}}
  .locked{opacity:.5;pointer-events:none;}
</style>
</head>
<body>
  <form class="card<?= $error ? ' shake' : '' ?>" method="post" id="f" autocomplete="off">
    <div class="logo">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7 4 12l5 5"></path><path d="m15 7 5 5-5 5"></path><path d="M13 4 11 20"></path></svg>
    </div>
    <h1>devlinks admin</h1>
    <div class="sub">Введите PIN для доступа</div>

    <div class="dots" id="dots">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>
    <div class="err"><?= htmlspecialchars($error, ENT_QUOTES) ?></div>

    <input type="hidden" name="pin" id="pin" value="">
    <input type="hidden" name="csrf" value="<?= htmlspecialchars($csrf, ENT_QUOTES) ?>">

    <div class="pad<?= $locked ? ' locked' : '' ?>" id="pad">
      <button type="button" class="key" data-d="1">1</button>
      <button type="button" class="key" data-d="2">2</button>
      <button type="button" class="key" data-d="3">3</button>
      <button type="button" class="key" data-d="4">4</button>
      <button type="button" class="key" data-d="5">5</button>
      <button type="button" class="key" data-d="6">6</button>
      <button type="button" class="key" data-d="7">7</button>
      <button type="button" class="key" data-d="8">8</button>
      <button type="button" class="key" data-d="9">9</button>
      <button type="button" class="key wide ghost" id="del" title="Стереть">⌫</button>
      <button type="button" class="key" data-d="0">0</button>
      <button type="submit" class="key wide enter" id="go" title="Войти">→</button>
    </div>
  </form>

<script>
(function(){
  var MAXLEN = 4;
  var pin = document.getElementById('pin');
  var dots = [].slice.call(document.querySelectorAll('#dots .dot'));
  var pad = document.getElementById('pad');
  var locked = <?= $locked ? 'true' : 'false' ?>;
  var wait = <?= (int)$wait ?>;
  var val = '';

  function render(){
    dots.forEach(function(d,i){ d.classList.toggle('on', i < val.length); });
    pin.value = val;
  }
  function add(d){ if(locked) return; if(val.length<MAXLEN){ val+=d; render(); if(val.length===MAXLEN){ setTimeout(function(){ document.getElementById('f').requestSubmit(); }, 130); } } }
  function del(){ if(locked) return; val=val.slice(0,-1); render(); }

  pad.addEventListener('click', function(e){
    var b = e.target.closest('button'); if(!b) return;
    if(b.dataset.d!=null) add(b.dataset.d);
  });
  document.getElementById('del').addEventListener('click', del);

  document.addEventListener('keydown', function(e){
    if(e.key>='0' && e.key<='9'){ add(e.key); }
    else if(e.key==='Backspace'){ del(); e.preventDefault(); }
    else if(e.key==='Enter'){ if(val.length) document.getElementById('f').requestSubmit(); }
  });

  document.getElementById('f').addEventListener('submit', function(e){
    if(locked || val.length===0){ e.preventDefault(); }
  });

  // Countdown while locked out
  if(locked && wait>0){
    var sub = document.querySelector('.sub');
    var tick = setInterval(function(){
      wait--;
      sub.textContent = 'Заблокировано — подождите ' + wait + ' с';
      if(wait<=0){ clearInterval(tick); location.reload(); }
    },1000);
    document.querySelector('.sub').textContent = 'Заблокировано — подождите ' + wait + ' с';
  }
  render();
})();
</script>
</body>
</html>
