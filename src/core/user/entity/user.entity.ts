export class UserEntity {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private role: string,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
    private isActivated: boolean = true,
    private id?: string | undefined,
  ) {
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

  private validateData() {
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

  private validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  private validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  private validateRole(role: string): boolean {
    return role === 'admin' || role === 'user';
  }

  private validateIsActivated(isActivated: boolean): boolean {
    return typeof isActivated === 'boolean';
  }

  private validateCreatedAt(createdAt: Date): boolean {
    return createdAt instanceof Date;
  }

  private validateUpdatedAt(updatedAt: Date): boolean {
    return updatedAt instanceof Date;
  }

  private validateName(name: string): boolean {
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

  changeName(name: string) {
    this.validateName(this.name);
    this.name = name;
  }

  changeEmail(email: string) {
    this.validateEmail(this.email);
    this.email = email;
  }

  changePassword(password: string) {
    this.validatePassword(this.password);
    this.password = password;
  }

  changeRole(role: string) {
    this.validateRole(this.role);
    this.role = role;
  }

  changeIsActivated(isActivated: boolean) {
    this.validateIsActivated(this.isActivated);
    this.isActivated = isActivated;
  }
}
