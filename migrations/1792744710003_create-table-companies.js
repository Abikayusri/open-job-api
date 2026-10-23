/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;


export const up = (pgm) => {
    pgm.createTable('companies', {
        id: { type: 'VARCHAR(50)', primaryKey: true },
        name: { type: 'TEXT', notNull: true },
        location: { type: 'TEXT', notNull: true },
        description: { type: 'TEXT' },
        created_at: { type: 'TIMESTAMP', notNull: true, default: pgm.func('current_timestamp') },
        updated_at: { type: 'TIMESTAMP', notNull: true, default: pgm.func('current_timestamp') },
    });
};

export const down = (pgm) => {
    pgm.dropTable('companies');
};