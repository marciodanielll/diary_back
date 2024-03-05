import {
  SignInInput,
  SignInOutput,
  SignUpOutput,
  SignUpInput,
} from '@/core/user/types';

export abstract class ISingUpUseCaseAdapter {
  abstract execute(data: SignUpInput): Promise<SignUpOutput>;
}

export abstract class ISingInUseCaseUseCaseAdapter {
  abstract execute(data: SignInInput): Promise<SignInOutput>;
}
