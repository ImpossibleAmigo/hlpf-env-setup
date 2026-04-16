# Практичне заняття №2

## 👤 Студент
* **ПІБ:** [Твоє Прізвище та Ім'я]
* **Група:** [Твоя Група]
* [cite_start]**Предмет:** Розробка на NestJS з використанням Docker, PostgreSQL та Redis [cite: 282-283]

---

## 📂 Структура репозиторію
* [cite_start]`src/` — Вихідний код NestJS проекту [cite: 285, 290]
* [cite_start]`Dockerfile` — Конфігурація для збірки образу [cite: 286]
* [cite_start]`docker-compose.yml` — Опис сервісів (app, postgres, redis) [cite: 287]
* [cite_start]`.env.example` — Шаблон змінних оточення [cite: 288, 291]
* [cite_start]`README.md` — Звіт про виконання роботи [cite: 289]

---

## 🚀 Запуск проекту
[cite_start]Для запуску середовища розробки виконайте наступні команди [cite: 292-295]:

```bash
# Копіювання конфігурації
cp .env.example .env

# Збірка та запуск сервісів
docker compose up --build -d

✅ Перевірка сервісів
У цьому розділі наведено результати перевірки працездатності всіх компонентів системи.

1. Загальний стан контейнерів (docker compose ps)

Команда для перевірки статусів усіх сервісів:
docker compose ps
Вивід команди:
NAME                        IMAGE                COMMAND                  SERVICE    CREATED             STATUS                       PORTS
hlpf-env-setup-app-1        hlpf-env-setup-app   "docker-entrypoint.s…"   app        About an hour ago   Up About an hour             0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp
hlpf-env-setup-postgres-1   postgres:16-alpine   "docker-entrypoint.s…"   postgres   About an hour ago   Up About an hour (healthy)   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp
hlpf-env-setup-redis-1      redis:7-alpine       "docker-entrypoint.s…"   redis      About an hour ago   Up About an hour (healthy)   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp

2. Перевірка PostgreSQL
Команда для перевірки підключення до бази даних:
docker compose exec postgres psql -U nestuser -d nestdb -c '\l'
Вивід команди:
                                                      List of databases
   Name    |  Owner   | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules |   Access privileges
-----------+----------+----------+-----------------+------------+------------+------------+-----------+-----------------------
 nestdb    | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 postgres  | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 template0 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
 template1 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
(4 rows)

3. Перевірка Redis
Перевірка зв'язку з сервісом кешування:
docker compose exec redis redis-cli ping
Вивід команди (очікується PONG):
PONG

4. Перевірка застосунку (curl)
Перевірка доступності NestJS API:
curl http://localhost:3000
Вивід команди (очікується Hello World!):
Hello World!

📜 Логи NestJS (фрагмент запуску)
Ключові рядки, що підтверджують успішну ініціалізацію TypeORM та старт програми :
[5:16:31 PM] Starting compilation in watch mode...
app-1  |
app-1  | [5:16:37 PM] Found 0 errors. Watching for file changes.
app-1  |
app-1  | [Nest] 29  - 04/16/2026, 5:16:39 PM     LOG [NestFactory] Starting Nest application...
app-1  | [Nest] 29  - 04/16/2026, 5:16:39 PM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +108ms
app-1  | [Nest] 29  - 04/16/2026, 5:16:39 PM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
app-1  | [Nest] 29  - 04/16/2026, 5:16:39 PM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
app-1  | [Nest] 29  - 04/16/2026, 5:16:39 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
app-1  | [Nest] 29  - 04/16/2026, 5:16:39 PM     LOG [InstanceLoader] CacheModule dependencies initialized +19ms
app-1  | [Nest] 29  - 04/16/2026, 5:16:39 PM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +172ms
app-1  | [Nest] 29  - 04/16/2026, 5:16:39 PM     LOG [RoutesResolver] AppController {/}: +4ms
app-1  | [Nest] 29  - 04/16/2026, 5:16:39 PM     LOG [RouterExplorer] Mapped {/, GET} route +3ms
app-1  | [Nest] 29  - 04/16/2026, 5:16:39 PM     LOG [NestApplication] Nest application successfully started +3ms