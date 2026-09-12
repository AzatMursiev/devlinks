# Скриншоты для README

`screenshot-light.png` — главная в светлой теме, анонимный вид, 1440px.
Снят из headless-Chrome, поэтому без элементов браузера и без админ-сессии.

Пересобрать после изменений в вёрстке:

```bash
chrome --headless=new --hide-scrollbars --window-size=1440,1020 \
       --virtual-time-budget=12000 \
       --screenshot=docs/screenshot-light.png \
       https://azatmursiev.com/links/
```

Тёмную тему (`screenshot-dark.png`) так снять не выйдет — выбор темы хранится
в `localStorage`, headless-запуск стартует с чистым профилем. Снимайте вручную:
переключатель-луна в шапке, затем `F12` → `Ctrl+Shift+M` → ширина 1440 →
меню `⋮` → **Capture screenshot**.
