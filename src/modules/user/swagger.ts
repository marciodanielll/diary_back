import { swagger } from '@utils/docs/swagger';
import { jwtTokenExample as token } from '@utils/docs/examples';
import crypto from 'crypto';
import {
  SignUpInput,
  SignUpOutput,
  SignInInput,
  SignInOutput,
} from '@core/user/types';

const payloadInputSignUp: SignUpInput = {
  name: 'Jose da Silva',
  email: 'jose.silva@gmail.com',
  password: 'strongPassword',
};
const payloadOutputSingUp: SignUpOutput = {
  token,
  id: crypto.randomUUID(),
};

const payloadInputSignIn: SignInInput = {
  email: 'jose.silva@gmail.com',
  password: 'strongPassword',
};

const payloadOutputSignIn: SignInOutput = {
  token,
  name: 'José da Silva',
};

export const SwaggerResponseUser = {
  signup: {
    201: swagger.defaultResponseJSON({
      json: payloadOutputSingUp,
      status: 201,
      description: 'User created successfully.',
    }),
  },
  signin: {
    200: swagger.defaultResponseJSON({
      json: payloadOutputSignIn,
      status: 200,
      description: 'The user has been successfully logged in.',
    }),
  },
};

export const SwaggerRequestUser = {
  receivePayloadToSignUp: swagger.defaultRequestJSON(payloadInputSignUp),
  receivePayloadToSignIn: swagger.defaultRequestJSON(payloadInputSignIn),
};
