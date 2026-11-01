import {createClient} from "redis";

const CACHE_TTL_IN_SECONDS = 3600;

class CacheService {
    constructor() {
        this.client = createClient({
            socket: {host: process.env.REDIS_HOST},
            disableOfflineQueue: true
        });

        this.client.on('error', (error) => console.error(error.message));
        this.client.connect().catch((error) => console.error(error.message));
    }

    async getOrSet(key, fetchData) {
        const cached = await this.client.get(key);

        if (cached !== null) {
            return {data: JSON.parse(cached), source: 'cache'};
        }

        const data = await fetchData();

        if (data !== undefined) {
            await this.client.set(key, JSON.stringify(data), {EX: CACHE_TTL_IN_SECONDS});
        }

        return {data, source: 'database'};
    }

    delete(...keys) {
        return this.client.del(keys)
    }
}

export default new CacheService();