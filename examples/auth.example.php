<?php
/**
 * Шаблон приватного конфига админки.
 *
 * На сервере этот файл лежит ВНЕ веб-корня — в `/var/www/links-private/auth.php`
 * (владелец www-data, папка 750, файл 640). В веб-корень его класть нельзя:
 * оттуда он стал бы доступен по прямой ссылке вместе с хэшем PIN.
 *
 * Установка:
 *   cp examples/auth.example.php /var/www/links-private/auth.php
 *   php -r 'echo password_hash("1234", PASSWORD_DEFAULT), PHP_EOL;'   # свой PIN
 *   # подставить полученный хэш в DL_PIN_HASH
 */

// bcrypt-хэш PIN. Сам PIN нигде не хранится и не логируется.
// Хэш ниже — заглушка от PIN "0000", использовать в бою нельзя.
define('DL_PIN_HASH', '$2y$10$0000000000000000000000000000000000000000000000000000');

// Пути к приватным файлам (оба вне веб-корня).
define('DL_PANEL',    '/var/www/links-private/panel.html');
define('DL_THROTTLE', '/var/www/links-private/throttle.json');

// Защита от перебора: после DL_MAX_FAILS неудач вход блокируется
// на DL_LOCK_SECONDS секунд. PIN четырёхзначный, поэтому throttle обязателен.
define('DL_MAX_FAILS',    5);
define('DL_LOCK_SECONDS', 60);

// Время жизни админ-сессии, секунды (12 часов).
define('DL_SESSION_TTL', 43200);

/**
 * Стартует сессию админки с ужатой областью видимости куки:
 * только путь /links/, httponly (JS не читает), secure (только HTTPS),
 * SameSite=Lax — за счёт последнего кросс-сайтовый POST не несёт сессию,
 * что и закрывает CSRF на projects.php без отдельного токена.
 */
function dl_session_start() {
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/links/',
        'httponly' => true,
        'secure'   => true,
        'samesite' => 'Lax',
    ]);
    session_name('DLADMIN');
    session_start();
}
