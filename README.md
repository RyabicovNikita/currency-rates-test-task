Проект Currency rates

# Развёртка

- npm install

- npm run dev

*По умолчанию приложение запускается на (http://localhost:5173)*

# Тестирование

Проект использует **Vitest** с библиотекой **@testing-library/react** для тестирования компонентов.

## Запуск тестов

### Кратко и быстро
npm test

### С подробной информацией

npx vitest --reporter verbose

### Открыть результат тестов в браузере (с графическим интерфейсом)

npx vitest --ui


# Основные скрипты

- npm run dev : поднимает локальный сервер **основной способ запуска проекта**
- npm run build : запускает TS компилятор для сборки по настройкам из *tsconfig.json* после чего собирает build для продакшена
- npm run lint : проверяет весь проект с помощью ESLint. **Ищет потенциальные ошибки**, нарушение код-стайла или плохие практики
- npm run lint:fix : проверяет проект с помощью ESLint и **сразу исправляет найденные ошибки**
- npm run preview: поднимает локальный сервер для предпросмотра собранной (npm run build) версии
- npm run test : **запуск тестов с помощью Vitest**


# Архитектура

Проект реализован по методологии **Feature-Sliced Design (FSD)**

## Структура проекта

src/
    0-app/
    1-process/
    2-pages/
    3-widgets/
    4-features/
    5-entities/
    6-shared/

Для лёгкого импорта настроены alias

@app = src/0-app
@process = src/1-process,
@pages = src/2-pages,
@widgets = src/3-widgets,
@features = src/4-features,
@entities = src/5-entities,
@assets = src/6-shared/assets,
@shared = src/6-shared,

# Полезно
1) В **eslint.config.js** есть правило simple-import-sort/imports, где прописаны группы импортов, соответствующие FSD слоям (автоматически сортирует импорты при сохранении файла)
2) Для корректной работы ESLint и Prettier рекомендуется установить соответствующие расширения в свой IDE

# Предупреждение
Т.к. запрос идёт каждые 30 секунд после n запросов api.coingate могут заблокировать доступ (403 Forbitten), из за "Подозрительной активности", поэтому в rates.js лежит вторая моковая функция для эмуляции запроса и ручного тестирования, например, смены цвета при изменении курса. Функция генерирует случайный курс. Для работы достаточно раскомментировать функцию (закоментировав основную), импортировать мок-файл с данными и использовать его как rates в этой функции.