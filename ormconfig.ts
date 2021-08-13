
export default {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "typeorm",
    password: "password",
    database: process.env.DB_NAME,
    migrations: ["src/database/migrations/*.ts"],
    entities: ["src/entities/*.ts"],
    seeds: ['src/seeds/**/*{.ts,.js}'],
    factories: ["src/factories/*.factory.ts"],
    synchronize: process.env.NODE_ENV === 'test' ? true : false,
    dropSchema: process.env.NODE_ENV === 'test' ? true : false,
    // migrationsRun: process.env.NODE_ENV === 'test' ? true : false,
    cli: {
        migrationsDir: "src/database/migrations",
        entitiesDir: "src/entities"
    }
}