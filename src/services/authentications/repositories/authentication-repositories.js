import {Pool} from "pg";

class AuthenticationRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async addRefreshToken(token) {
        await this.pool.query({
            text: 'INSERT INTO authentications VALUES($1)',
            values: [token]
        });
    }

    async deleteRefreshToken(token) {
        await this.pool.query({
            text: 'DELETE FROM authentications WHERE token = $1',
            values: [token]
        })
    }

    async verifyRefreshToken(token) {
        const result = await this.pool.query({
            text: 'SELECT token FROM authentications WHERE token = $1',
            values: [token]
        });

        return result.rows.length > 0;
    }
}

export default new AuthenticationRepositories();