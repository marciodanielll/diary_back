import {
  UserCreateInput,
  UserLoginInput,
  UserLoginOutput,
  UserCreateOutput,
} from '@/core/user/types';

export abstract class IUserCreateUseCaseAdapter {
  abstract execute(data: UserCreateInput): Promise<UserCreateOutput>;
}

export abstract class IUserLoginUseCaseAdapter {
  abstract execute(data: UserLoginInput): Promise<UserLoginOutput>;
}
