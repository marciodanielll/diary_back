export declare class UserEntity {
    private name;
    private email;
    private password;
    private role;
    private createdAt;
    private updatedAt;
    private isActivated;
    private id?;
    constructor(name: string, email: string, password: string, role: string, createdAt?: Date, updatedAt?: Date, isActivated?: boolean, id?: string | undefined);
    private validateData;
    private validateEmail;
    private validatePassword;
    private validateRole;
    private validateIsActivated;
    private validateCreatedAt;
    private validateUpdatedAt;
    private validateName;
    getData(): {
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        isActivated: boolean;
        id?: string;
    };
    getWithSnakeCase(): {
        name: string;
        email: string;
        password: string;
        role: string;
        created_at: Date;
        updated_at: Date;
        is_activated: boolean;
        id?: string;
    };
    changeName(name: string): void;
    changeEmail(email: string): void;
    changePassword(password: string): void;
    changeRole(role: string): void;
    changeIsActivated(isActivated: boolean): void;
}
