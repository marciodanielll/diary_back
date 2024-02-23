"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetAllUseCase = void 0;
class UserGetAllUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute() {
        const users = await this.userRepository.findAll();
        return users;
    }
}
exports.UserGetAllUseCase = UserGetAllUseCase;
//# sourceMappingURL=user.getall.js.map