import {Pool} from "pg";
import {nanoid} from "nanoid";

class CompanyRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createCompany({name, location, description}) {
        const id = `company-${nanoid(16)}`;

        const result = await this.pool.query({
            text: 'INSERT INTO companies(id, name, location, description) VALUES ($1, $2, $3, $4) RETURNING id',
            values: [id, name, location, description]
        });

        return result.rows[0];
    }

    async getCompanies() {
        const result = await this.pool.query('SELECT * FROM companies');
        return result.rows;
    }

    async getCompanyById(id) {
        const result = await this.pool.query({
            text: 'SELECT * FROM companies WHERE id = $1',
            values: [id]
        });

        return result.rows[0];
    }

    async editCompany(id, {name, location, description}) {
        const result = await this.pool.query({
            text: 'UPDATE companies SET name = $1, location = $2, description = $3, updated_at = current_timestamp WHERE id = $4 RETURNING id',
            values: [name, location, description, id]
        });

        return result.rows[0];
    }

    async deleteCompany(id) {
        const result = await this.pool.query({
            text: 'DELETE FROM companies WHERE id = $1 RETURNING id',
            values: [id]
        });

        return result.rows[0];
    }
}

export default new CompanyRepositories();
