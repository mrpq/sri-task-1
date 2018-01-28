Первая ошибка получена при запуске

```
/Users/mrzgmac/programming/sri/entrance-task-1/node_modules/sequelize/lib/sequelize.js:175
      throw new Error('Dialect needs to be explicitly supplied as of v4.0.0');
      ^

Error: Dialect needs to be explicitly supplied as of v4.0.0
    at new Sequelize (/Users/mrzgmac/programming/sri/entrance-task-1/node_modules/sequelize/lib/sequelize.js:175:13)
    at Object.<anonymous> (/Users/mrzgmac/programming/sri/entrance-task-1/models/index.js:7:19)
    at Module._compile (module.js:612:30)
    ...
```

Быстрый поиск по доке подсказал формат подключения для sqlite. Пофиксил в `models/index.js:7:19`. 

Запустилось.

Далее я проверял все ли запросы выполняются.
Обнаружились следующие проблемы
1. Не выполнялся запрос `events`.
  Анализ `resolvers/query.js` показал что в соответствующем резолвере `events` в файндер `findAll` первым передавался несуществующий агрумент `arguments`. Заменил на по аналогии на `{}` как в резолвере для `users`.

2. Глядя в код `resolvers/index.js` заодно попробовал запросить `users` и `room` для `event`. Они возвращали `null`. Стало понятно, что причина в том, что у резолверов забыли `return`. Пофиксил

3. Обнаружились проблемы в мутаторах
  - `addUserToEvent` - не был имплементирован
  - `changeEventRoom` - в `setRoom()` передавался не та переменная, так же он ничего не возвращал.

4. Так же добавил middlware для CORS, чтобы сервер отвечал за запросы со стороннего хоста (для обработки запросов с dev сервера create-react-app)

5 Добавил строчку `avatarUrl: String` в `typeDefs.js` в `UserInput` для возможности создавать пользователей с аватарами.

---

# Приложение для создания и редактирования информации о встречах сотрудников

Написано для Node.js 8 и использует библиотеки:
* express
* sequelize
* graphql

## Задание
Код содержит ошибки разной степени критичности. Некоторых из них стилистические, а некоторые даже не позволят вам запустить приложение. Вам необходимо найти и исправить их.

Пункты для самопроверки:
1. Приложение должно успешно запускаться
2. Должно открываться GraphQL IDE - http://localhost:3000/graphql/
3. Все запросы на получение или изменения данных через graphql должны работать корректно. Все возможные запросы можно посмотреть в вкладке Docs в GraphQL IDE или в схеме (typeDefs.js)
4. Не должно быть лишнего кода
5. Все должно быть в едином codestyle

## Запуск
```
npm i
npm run dev
```

Для сброса данных в базе:
```
npm run reset-db
```
