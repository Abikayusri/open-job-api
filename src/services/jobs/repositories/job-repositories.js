import {Pool} from "pg";
import {nanoid} from "nanoid";

const SELECT_JOBS = `SELECT jobs.*, companies.name AS company_name, categories.name AS category_name
    FROM jobs
    LEFT JOIN companies ON companies.id = jobs.company_id
    LEFT JOIN categories ON categories.id = jobs.category_id`;

class JobRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createJob(job) {
        const id = `job-${nanoid(16)}`;

        const result = await this.pool.query({
            text: `INSERT INTO jobs(id, company_id, category_id, title, description, job_type, experience_level,
                location_type, location_city, salary_min, salary_max, is_salary_visible, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
            values: [
                id, job.company_id, job.category_id, job.title, job.description, job.job_type,
                job.experience_level, job.location_type, job.location_city, job.salary_min,
                job.salary_max, job.is_salary_visible, job.status
            ]
        });

        return result.rows[0];
    }

    async getJobs({title, companyName}) {
        const conditions = [];
        const values = [];

        if (title) {
            values.push(`%${title}%`);
            conditions.push(`jobs.title ILIKE $${values.length}`);
        }

        if (companyName) {
            values.push(`%${companyName}%`);
            conditions.push(`companies.name ILIKE $${values.length}`);
        }

        const where = conditions.length ? ` WHERE ${conditions.join(' AND ')}` : '';
        const result = await this.pool.query({text: `${SELECT_JOBS}${where}`, values});

        return result.rows;
    }

    async getJobById(id) {
        const result = await this.pool.query({
            text: `${SELECT_JOBS} WHERE jobs.id = $1`,
            values: [id]
        });

        return result.rows[0];
    }

    async getJobsByCompanyId(companyId) {
        const result = await this.pool.query({
            text: `${SELECT_JOBS} WHERE jobs.company_id = $1`,
            values: [companyId]
        });

        return result.rows;
    }

    async getJobsByCategoryId(categoryId) {
        const result = await this.pool.query({
            text: `${SELECT_JOBS} WHERE jobs.category_id = $1`,
            values: [categoryId]
        });

        return result.rows;
    }

    async editJob(id, job) {
        const result = await this.pool.query({
            text: `UPDATE jobs SET company_id = $1, category_id = $2, title = $3, description = $4, job_type = $5,
                experience_level = $6, location_type = $7, location_city = $8, salary_min = $9, salary_max = $10,
                is_salary_visible = $11, status = $12, updated_at = current_timestamp
                WHERE id = $13 RETURNING id`,
            values: [
                job.company_id, job.category_id, job.title, job.description, job.job_type,
                job.experience_level, job.location_type, job.location_city, job.salary_min,
                job.salary_max, job.is_salary_visible, job.status, id
            ]
        });

        return result.rows[0];
    }

    async deleteJob(id) {
        const result = await this.pool.query({
            text: 'DELETE FROM jobs WHERE id = $1 RETURNING id',
            values: [id]
        });

        return result.rows[0];
    }
}

export default new JobRepositories();
