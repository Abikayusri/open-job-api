/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

export const up = (pgm) => {
    pgm.addConstraint('applications', 'unique_user_job_application', 'UNIQUE(user_id, job_id)');
};

export const down = (pgm) => {
    pgm.dropConstraint('applications', 'unique_user_job_application');
};