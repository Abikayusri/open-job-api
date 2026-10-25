import {Pool} from "pg";
import {nanoid} from "nanoid";

class CategoryRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createCategory({name}) {
        const id = `category-${nanoid(16)}`;

        const result = await this.pool.query({
            text: 'INSERT INTO categories(id, name) VALUES ($1, $2) RETURNING id',
            values: [id, name]
        });

        return result.rows[0];
    }

    async getCategories() {
        const result = await this.pool.query('SELECT * FROM categories');
        return result.rows;
    }

    async getCategoryById(id) {
        const result = await this.pool.query({
            text: 'SELECT * FROM categories WHERE id = $1',
            values: [id]
        });

        return result.rows[0];
    }

    async editCategory(id, {name}) {
        const result = await this.pool.query({
            text: 'UPDATE categories SET name = $1, updated_at = current_timestamp WHERE id = $2 RETURNING id',
            values: [name, id]
        });

        return result.rows[0];
    }

    async deleteCategory(id) {
        const result = await this.pool.query({
            text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
            values: [id]
        });

        return result.rows[0];
    }
}

export default new CategoryRepositories();