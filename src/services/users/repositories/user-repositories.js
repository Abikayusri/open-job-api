import {Pool} from "pg";
import {nanoid} from "nanoid";
import bcrypt from 'bcrypt';

class UserRepositories {
    constructor() {
        this.pool = new Pool;
    }

    async createUser(
        {
            name, email, password, role
        }
    ) {
        const id = `user-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = {
            text: 'INSERT INTO users(id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            values: [id, name, email, hashedPassword, role]
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    async getUserById(id) {
        const query = {
            text: 'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1',
            values: [id]
        }

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    async verifyUserCredential(email, password) {
        const query = {
            text: 'SELECT id, password FROM users WHERE email = $1',
            values: [email]
        }

        const result = await this.pool.query(query);

        if (!result.rows.length) {
            return null;
        }

        const {id, password: hashedPassword} = result.rows[0];
        const isMatch = await bcrypt.compare(password, hashedPassword);

        return isMatch ? id : null;
    }
}

export default new UserRepositories();