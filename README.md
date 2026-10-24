# Портфолио

Статический сайт без сборки. Публикуется на GitHub Pages.

## Структура

- `index.html`, `works.html`, `project.html`, `contacts.html` — страницы
- `config/` — все тексты и настройки сайта
  - `site.js` — имя, навигация, заголовки, футер
  - `home.js` — главная: фото, имя, био, кнопки, дополнительные блоки (`blocks`)
  - `works.js` — заголовок страницы работ
  - `contacts.js` — контакты
  - `projects/` — по одному файлу на каждую работу, `index.js` задаёт порядок
- `css/` — стили
  - `variables.css` — цвета, шрифты, скорость анимаций, скругления
  - `base.css`, `layout.css`, `components.css`, `animations.css`
  - `pages/` — стили отдельных страниц
- `js/` — логика
  - `main.js` — точка входа
  - `core/` — DOM-хелпер, шапка и подвал, анимации появления
  - `components/` — карточки, блоки статьи, заголовки страниц
  - `pages/` — рендер каждой страницы
- `assets/images/` — фото (`portrait.jpg`), иконка (`favicon.svg`), обложки в `projects/`

## Добавить работу

1. Создайте `config/projects/название.js` по образцу существующего файла.
2. Добавьте его импорт и элемент в массив в `config/projects/index.js`.
3. Обложку положите в `assets/images/projects/` и укажите путь в поле `cover`.

Типы блоков статьи: `heading`, `paragraph`, `quote`, `list`, `links`, `image`, `divider`.

## Публикация на GitHub Pages

1. Создайте репозиторий, например `username.github.io`.
2. Загрузите содержимое папки в ветку `main`.
3. В Settings → Pages выберите источник «Deploy from a branch», ветка `main`, папка `/ (root)`.
