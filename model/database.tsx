import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schema';
import User from './User';

const adapter = new SQLiteAdapter({
    // dbName: 'MyAppDB',
    schema: mySchema,
});

export const database = new Database({
    adapter,
    modelClasses: [User],
});