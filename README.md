# Yandex.Praktikum
#### Жигайков Роман
###### Дипломный проект newsapp
###### Версия 1.0.4

Вёрстка макета и настройка инфраструктуры дипломного проекта по курсу веб-разработки. Создан отдельный репозиторий для front-end части проекта. Добавлены все необходимые инфраструктурные файлы: .gitignore, .editorconfig, .eslintrc, инициализирован package.json.

Подключены и настроены все запрашиваемые плагины. Вебпак настроен: собирает проект, располагает итоговые файлы в соответствующих папках каталога /dist (шрифты в /dist/vendor, файлы js в /dist/js, стили в /dist/styles, изображения в /dist/images). Исходные файлы располагаются в ветке level-2 удаленного репозитория. Итоговые файлы, обработанные вебпаком, располагаются в ветке gh-pages удаленного репозитория. 

Вёрстка сделана по методологии БЭМ. Изображения оптимизированы, в разных частях проекта есть переиспользуемые блоки, реализована микроанимация кнопок, ссылок и инпутов. 

Актуальная версия программы доступна по ссылке https://timesnewrouman.github.io/newsapp-frontend. Для перехода на страницу сохраненных статей можно добавить класс элементу в заголовке (header__saved header__saved_logged-in), либо воспользоваться ссылкой https://timesnewrouman.github.io/newsapp-frontend/articles.html. В завершающей части проекта данный момент будет автоматизирован при помощи JS. 

Команда npm run start запускает сервер в продакшн-режиме.
Команда npm run dev запускает сервер в режиме разработки с хот-релоудом.
Команда npm run build собирает проект в папке dist.
Команда npm run deploy размещает актуальную сборку проекта в ветке gh-pages удаленного репозитория проекта.
