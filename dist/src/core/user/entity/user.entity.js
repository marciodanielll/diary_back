"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(name, email, password, role, createdAt = new Date(), updatedAt = new Date(), isActivated = true, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isActivated = isActivated;
        this.id = id;
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isActivated = isActivated;
        this.validateData();
    }
    validateData() {
        if (!this.validateEmail(this.email)) {
            throw new Error('Invalid email');
        }
        if (!this.validatePassword(this.password)) {
            throw new Error('Invalid password');
        }
        if (!this.validateRole(this.role)) {
            throw new Error('Invalid role');
        }
        if (!this.validateIsActivated(this.isActivated)) {
            throw new Error('Invalid isActivated');
        }
        if (!this.validateName(this.name)) {
            throw new Error('Invalid name');
        }
        if (!this.validateCreatedAt(this.createdAt)) {
            throw new Error('Invalid createdAt');
        }
        if (!this.validateUpdatedAt(this.updatedAt)) {
            throw new Error('Invalid updatedAt');
        }
        if (!this.validateUpdatedAt(this.updatedAt)) {
            throw new Error('Invalid updatedAt');
        }
    }
    validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    validatePassword(password) {
        return password.length >= 8;
    }
    validateRole(role) {
        return role === 'admin' || role === 'user';
    }
    validateIsActivated(isActivated) {
        return typeof isActivated === 'boolean';
    }
    validateCreatedAt(createdAt) {
        return createdAt instanceof Date;
    }
    validateUpdatedAt(updatedAt) {
        return updatedAt instanceof Date;
    }
    validateName(name) {
        return name.length >= 2;
    }
    getData() {
        return {
            ...(this.id ? { id: this.id } : {}),
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            isActivated: this.isActivated,
        };
    }
    getWithSnakeCase() {
        return {
            ...(this.id ? { id: this.id } : {}),
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            is_activated: this.isActivated,
        };
    }
    changeName(name) {
        this.validateName(this.name);
        this.name = name;
    }
    changeEmail(email) {
        this.validateEmail(this.email);
        this.email = email;
    }
    changePassword(password) {
        this.validatePassword(this.password);
        this.password = password;
    }
    changeRole(role) {
        this.validateRole(this.role);
        this.role = role;
    }
    changeIsActivated(isActivated) {
        this.validateIsActivated(this.isActivated);
        this.isActivated = isActivated;
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map