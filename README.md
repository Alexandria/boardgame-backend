## You must first install [postgress](https://www.postgresql.org/) and create your own databse.

## Once you have created your database, you will need to configure your .env file and run `npm install`

## .env configuration

- PORT= YOUR_SERVER_PORT
- PGUSER= USER
- PGHOST= HOST
- PGDATABASE= DATABASE_NAME
- PGPASSWORD=POSTGRESS_PASSWORD
- PGPORT=YOUR_POSTGRES_PORT
- DB_URL= DATABASE_URL

## Migrating the tables

You will need to run the following commands to migrate and seed the tables:

`npx sequelize db:migrate`

`npx sequelize db:seed:all`

## Querring the database

Below are some queries to run to test the database

`select bg.name`

`from public."BrdGames" bg`

`left join public."Users_BrdGames" usrbg on usrbg."brdGameId" = bg."brdGame_id"`

`where usrbg."userId" = 1;`

This will give you all of the boardgames that a user has by user_id

## Undoing Migrations

You can remove all tables(and any seeding) by running the code below.
`npx sequelize db:migrate:all`

You can remove just the seeds by running this code
`npx sequelize db:seed:undo:all`
