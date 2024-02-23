"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateUseCase = void 0;
const user_entity_1 = require("../entity/user.entity");
class UserCreateUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const newUser = new user_entity_1.UserEntity(data.name, data.email, data.password, data.role, data.createdAt, data.updatedAt, data.isActivated);
        const user = await this.userRepository.create(newUser.getWithSnakeCase());
        return user;
    }
}
exports.UserCreateUseCase = UserCreateUseCase;
//# sourceMappingURL=user.create.js.map