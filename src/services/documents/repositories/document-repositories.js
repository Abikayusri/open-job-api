import {Pool} from "pg";
import {nanoid} from "nanoid";

class DocumentRepositories {
    constructor() {
        this.pool = new Pool;
    }

    async createDocument({userId, fileName, originalName, size}) {
        const id = `document-${nanoid(16)}`;

        const result = await this.pool.query({
            text: 'INSERT INTO documents(id, user_id, filename, original_name, size) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            values: [id, userId, fileName, originalName, size]
        });

        return result.row[0];
    }

    async getDocuments() {
        const result = await this.pool.query('SELECT * FROM documents');
        return result.rows;
    }

    async getDocumentById(id) {
        const result = await this.pool.query({
            text: 'SELECT * FROM documents WHERE id = $1',
            values: [id]
        });
    }

    async deleteDocument(id, userId) {
        const result = await this.pool.query({
            text: 'DELETE FROM documents WHERE id = $1 AND user_id = $2 RETURNING id, filename',
            values: [id, userId]
        });

        return result.rows[0];
    }
}

export default new DocumentRepositories();