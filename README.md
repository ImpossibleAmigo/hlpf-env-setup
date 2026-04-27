# Практична робота №6: Interceptors, Filters, Swagger

**Студент:** [Ваше Прізвище та Ім'я]
**Група:** [Ваша Група]

### Виконані завдання:
1. **LoggingInterceptor**: Додано логування HTTP-методів, URL та часу обробки запиту.
2. **TransformInterceptor**: Налаштовано обгортку успішних відповідей у { data, statusCode, timestamp }. Виключено шляхи Swagger для стабільної роботи UI.
3. **HttpExceptionFilter**: Стандартизовано вигляд помилок. Кожна помилка містить унікальний 	raceId.
4. **Swagger UI**: Налаштовано документацію за адресою /api/docs. Виправлено помилки сумісності з ESM (ES Modules).

### Скріншот Swagger UI:
![Swagger](swagger-screenshot.png)

### Формат успішної відповіді:
`json
{
  "data": [],
  "statusCode": 200,
  "timestamp": "2026-04-27T18:37:45.702Z"
}
`

### Приклад логів (Logging Interceptor):
nest_app  | [32m[Nest] 34  - [39m04/27/2026, 3:34:50 PM [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/api/categories, POST} route[39m[38;5;3m +0ms[39m nest_app  | [32m[Nest] 34  - [39m04/27/2026, 3:34:50 PM [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/api/categories/:id, PATCH} route[39m[38;5;3m +1ms[39m nest_app  | [32m[Nest] 34  - [39m04/27/2026, 3:34:50 PM [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/api/categories/:id, DELETE} route[39m[38;5;3m +1ms[39m nest_app  | [32m[Nest] 34  - [39m04/27/2026, 3:34:50 PM [32m    LOG[39m [38;5;3m[NestApplication] [39m[32mNest application successfully started[39m[38;5;3m +4ms[39m nest_app  | Server: http://localhost:3000/api/docs