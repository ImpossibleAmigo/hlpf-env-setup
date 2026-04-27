# Практична робота №6: Interceptors, Exception Filters, Swagger

**Студент:** Олексій Чеберяко
**Група:** 232/1

## Виконані завдання
1. **LoggingInterceptor**: Реалізовано логування кожного запиту (метод, URL, статус-код та час виконання).
2. **TransformInterceptor**: Створено єдиний формат успішних відповідей { data, statusCode, timestamp }. Додано ігнорування шляхів Swagger для стабільної роботи UI.
3. **HttpExceptionFilter**: Стандартизовано обробку помилок. Додано генерацію унікального traceId для кожного виключення.
4. **Swagger/OpenAPI**: Налаштовано інтерактивну документацію на /api/docs. Виправлено помилки сумісності плагінів з ES Modules.

## Запуск проекту
```bash
docker compose up --build -d
```

## Swagger UI
Документація доступна за адресою: http://localhost:3000/api/docs

![Swagger UI](swagger-screenshot.png)

## Приклади форматів

### Успішна відповідь (TransformInterceptor)
```json
{
  "data": [],
  "statusCode": 200,
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

### Приклад логів (Logging Interceptor)
```text
[HTTP] GET /api/products 200 12ms
[HTTP] POST /auth/login 201 45ms
```
