/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

export const up = (pgm) => {
    pgm.createTable('jobs', {
        id: { type: 'VARCHAR(50)', primaryKey: true },
        company_id: {
            type: 'VARCHAR(50)', notNull: true, references: 'companies', onDelete: 'CASCADE',
        },
        category_id: {
            type: 'VARCHAR(50)', notNull: true, references: 'categories', onDelete: 'CASCADE',
        },
        title: { type: 'TEXT', notNull: true },
        description: { type: 'TEXT' },
        job_type: { type: 'VARCHAR(30)' },
        experience_level: { type: 'VARCHAR(30)' },
        location_type: { type: 'VARCHAR(30)' },
        location_city: { type: 'TEXT' },
        salary_min: { type: 'INTEGER' },
        salary_max: { type: 'INTEGER' },
        is_salary_visible: { type: 'BOOLEAN', notNull: true, default: true },
        status: { type: 'VARCHAR(20)', notNull: true, default: 'open' },
        created_at: { type: 'TIMESTAMP', notNull: true, default: pgm.func('current_timestamp') },
        updated_at: { type: 'TIMESTAMP', notNull: true, default: pgm.func('current_timestamp') },
    });
};

export const down = (pgm) => {
    pgm.dropTable('jobs');
};