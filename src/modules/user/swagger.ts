import { swagger } from '@/utils/docs/swagger';
import { jwtTokenExample as token } from '@/utils/docs/examples';
import crypto from 'crypto';
import { SignUpOutput } from '@/core/user/types';

const payloadInputSinginUp: SignUpOutput = {
  token,
  id: crypto.randomUUID(),
};

export const SwaggerResponseUser = {
  singup: {
    201: swagger.defaultResponseJSON({
      json: payloadInputSinginUp,
      status: 201,
      description: 'User created successfully.',
    }),
  },
};
