import {
  SingUpInput,
  UserLoginInput,
  UserLoginOutput,
  SingUpOutput,
} from '@/core/user/types';

export abstract class ISingUpOutputUseCaseAdapter {
  abstract execute(data: SingUpInput): Promise<SingUpOutput>;
}

export abstract class IUserLoginUseCaseAdapter {
  abstract execute(data: UserLoginInput): Promise<UserLoginOutput>;
}
