import {Pool} from "pg";
import {nanoid} from "nanoid";

const SELECT_APPLICATIONS_WITH_JOB = `SELECT applications.*, users.name AS user_name, jobs.title AS job_title,
    jobs.job_type, jobs.status AS job_status, jobs.company_id, companies.name AS company_name, categories.name AS category_name`;

const FROM_APPLICATIONS_WITH_JOB = `FROM applications
    LEFT JOIN users ON users.id = applications.user_id
    LEFT JOIN jobs ON jobs.id = applications.job_id
    LEFT JOIN companies ON companies.id = jobs.company_id
    LEFT JOIN categories ON categories.id = jobs.category_id`;

class ApplicationRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createApplication({user_id: userId, job_id: jobId, status}) {
        const id = `application-${nanoid(16)}`;

        const result = await this.pool.query({
            text: 'INSERT INTO applications(id, user_id, job_id, status) VALUES ($1, $2, $3, $4) RETURNING id, user_id, job_id, status',
            values: [id, userId, jobId, status]
        });

        return result.rows[0];
    }

    async getApplications() {
        const result = await this.pool.query(`${SELECT_APPLICATIONS_WITH_JOB} ${FROM_APPLICATIONS_WITH_JOB}`);
        return result.rows;
    }

    async getApplicationById(id) {
        const result = await this.pool.query({
            text: 'SELECT * FROM applications WHERE id = $1',
            values: [id]
        });

        return result.rows[0];
    }

    async getApplicationsByUserId(userId) {
        const result = await this.pool.query({
            text: 'SELECT * FROM applications WHERE user_id = $1',
            values: [userId]
        });

        return result.rows;
    }

    async getApplicationsByJobId(jobId) {
        const result = await this.pool.query({
            text: 'SELECT * FROM applications WHERE job_id = $1',
            values: [jobId]
        });

        return result.rows;
    }

    async getProfileApplications(userId) {
        const result = await this.pool.query({
            text: `${SELECT_APPLICATIONS_WITH_JOB}, jobs.experience_level, jobs.location_type
                ${FROM_APPLICATIONS_WITH_JOB} WHERE applications.user_id = $1`,
            values: [userId]
        });

        return result.rows;
    }

    async getApplicationNotification(id) {
        const result = await this.pool.query({
            text: `SELECT applicants.name         AS applicant_name,
                          applicants.email        AS applicant_email,
                          applications.created_at AS applied_at,
                          jobs.title              AS job_title,
                          owners.email            AS owner_email
                   FROM applications
                            JOIN users AS applicants ON applicants.id = applications.user_id
                            JOIN jobs ON jobs.id = applications.job_id
                            JOIN companies ON companies.id = jobs.company_id
                            JOIN users AS owners ON owners.id = companies.owner
                   WHERE applications.id = $1`,
            values: [id]
        });

        return result.rows[0];
    }

    async editApplicationStatus(id, status) {
        const result = await this.pool.query({
            text: 'UPDATE applications SET status = $1, updated_at = current_timestamp WHERE id = $2 RETURNING id, user_id, job_id',
            values: [status, id]
        });

        return result.rows[0];
    }

    async deleteApplication(id) {
        const result = await this.pool.query({
            text: 'DELETE FROM applications WHERE id = $1 RETURNING id, user_id, job_id',
            values: [id]
        });

        return result.rows[0];
    }
}

export default new ApplicationRepositories();
