import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables
config();

const AppDataSource = new DataSource({
  type: 'sqlite', // or 'postgres', 'mysql', etc.
  database: process.env.DB_NAME || 'db.sqlite',
  // For PostgreSQL/MySQL, use these instead:
  // host: process.env.DB_HOST || 'localhost',
  // port: parseInt(process.env.DB_PORT) || 5432,
  // username: process.env.DB_USERNAME || 'postgres',
  // password: process.env.DB_PASSWORD || 'password',
  // database: process.env.DB_NAME || 'mycv',

  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false, // Always false in production
  logging: true,
});

export default AppDataSource;
