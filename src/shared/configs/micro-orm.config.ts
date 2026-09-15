import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { defineConfig } from '@mikro-orm/mongodb';
import { dbLogger } from '../../common/logger';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';

export default defineConfig({
  clientUrl: process.env.MONGODB_URL,
  dbName: process.env.DATABASE_NAME,

  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],

  debug: process.env.NODE_ENV !== 'production',
  highlighter: new MongoHighlighter(),

  preferEnvVars: true,

  metadataProvider: ReflectMetadataProvider,

  logger: (message: string) => dbLogger.log(message),
});

console.log(process.env.MONGODB_URL, process.env.DATABASE_NAME);
