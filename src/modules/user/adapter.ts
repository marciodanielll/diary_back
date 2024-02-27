import { User } from '@/core/user/types';

export abstract class IUserCreateUseCaseAdapter {
  abstract execute(data: User): Promise<User>;
}
