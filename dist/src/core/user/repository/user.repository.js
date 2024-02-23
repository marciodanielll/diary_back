"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findById(id) {
        const result = await this.databaseService.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return result.rows[0];
    }
    async findAll() {
        const result = await this.databaseService.query(`SELECT * FROM users`);
        return result.rows;
    }
    async create(user) {
        const result = await this.databaseService.query(`INSERT INTO users ( name, email, password, created_at, updated_at, is_activated, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [
            user.name,
            user.email,
            user.password,
            user.created_at,
            user.updated_at,
            user.is_activated,
            user.role,
        ]);
        return result.rows[0];
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map