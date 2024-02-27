import { userSchema, User, Roles } from './types';
import { BaseEntity, IEntity } from '@/utils/entity';

export class UserEntity
  extends BaseEntity<User>(userSchema)
  implements IEntity
{
  name: string;
  email: string;
  password: string;
  role = Roles.USER;
  isActivated = true;

  insertHashPassword(hash: string): void {
    this.password = hash;
  }

  constructor(entity: User) {
    super();
    Object.assign(this, this.validate(entity));
  }
}
