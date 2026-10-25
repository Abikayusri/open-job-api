import {Pool} from "pg";
import {nanoid} from "nanoid";

class ApplicationRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createApplication({user_id: userId, job_id: jobId, status}) {
        const id = `application-${nanoid(16)}`;

        const result = await this.pool.query({
            text: 'INSERT INTO applications(id, user_id, job_id, status) VALUES ($1, $2, $3, $4) RETURNING id',
            values: [id, userId, jobId, status]
        });

        return result.rows[0];
    }

    async getApplications() {
        const result = await this.pool.query('SELECT * FROM applications');
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

    async editApplicationStatus(id, status) {
        const result = await this.pool.query({
            text: 'UPDATE applications SET status = $1, updated_at = current_timestamp WHERE id = $2 RETURNING id',
            values: [status, id]
        });

        return result.rows[0];
    }

    async deleteApplication(id) {
        const result = await this.pool.query({
            text: 'DELETE FROM applications WHERE id = $1 RETURNING id',
            values: [id]
        });

        return result.rows[0];
    }
}

export default new ApplicationRepositories();
