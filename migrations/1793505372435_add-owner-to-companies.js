/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

export const up = (pgm) => {
    pgm.addColumn('companies', {
        owner: {
            type: 'VARCHAR(50)', notNull: true, references: 'users', onDelete: 'CASCADE',
        },
    });
};

export const down = (pgm) => {
    pgm.dropColumn('companies', 'owner');
};