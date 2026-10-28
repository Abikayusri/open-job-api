import {Pool} from "pg";
import {nanoid} from "nanoid";

class BookmarkRepositories {
    constructor() {
        this.pool = new Pool;
    }

    async addBookmark(userId, jobId) {
        const id = `bookmark-${nanoid(16)}`;

        const result = await this.pool.query({
            text: 'INSERT INTO bookmarks(id, user_id, job_id) VALUES ($1, $2, $3) RETURNING id',
            values: [id, userId, jobId]
        });

        return result.rows[0];
    }

    async getBookmarkById(id, jobId) {
        const result = await this.pool.query({
            text: 'SELECT * FROM bookmarks WHERE id = $1 AND job_id = $2', values: [id, jobId]
        });

        return result.rows[0];
    }

    async getBookmarksByUserId(userId) {
        const result = await this.pool.query({
            text: `SELECT bookmarks.*, jobs.title AS job_title
                   FROM bookmarks
                            LEFT JOIN jobs
                                      ON jobs.id = bookmarks.job_id
                   WHERE bookmarks.user_id = $1`,
            values: [userId]
        });

        return result.rows;
    }

    async deleteBookmark(userId, jobId) {
        const result = await this.pool.query({
            text: 'DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2 RETURNING id',
            values: [userId, jobId]
        });

        return result.rows[0];
    }
}

export default new BookmarkRepositories();