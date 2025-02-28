// model/schema.js
import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'users',
            columns: [
                { name: 'username', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'password', type: 'string', isOptional: true },
            ]
        }),
    ]
})