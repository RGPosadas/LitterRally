import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { User } from '../entities';
import { RegistrationMethod } from '@mull/types';

export const mockPartialUser: CreateUserInput | UpdateUserInput = {
  password: 'password',
  email: 'mock@mock.com',
  dob: new Date(),
  name: 'Mock McMockson',
  registrationMethod: RegistrationMethod.LOCAL,
};

export const mockNewPartialUser: CreateUserInput = {
  password: 'password',
  email: 'mock2@mock.com',
  dob: new Date(),
  name: 'Mock McMockson Jr.',
  registrationMethod: RegistrationMethod.LOCAL,
};

export const mockAllUsers: User[] = [
  {
    id: 1,
    password: '$2b$10$Wo/ClOmaI/qItblWM1saEeWgqv9S9nt6QO4KW1kBXdzPT1.q8XuuG',
    email: 'mock@mock.com',
    timezone: '',
    name: 'Bob',
    dob: new Date(),
    description: 'I am very good programmer',
    friends: [
      {
        id: 7,
        password: 'password',
        email: 'me@me.com',
        timezone: '',
        name: 'Cristian',
        dob: new Date(),
        description: "There's a first for everything",
        friends: [],
        registrationMethod: RegistrationMethod.LOCAL,
      },
      {
        id: 12,
        password: 'abc123',
        email: 'tim@green.co',
        timezone: '',
        name: 'Tim',
        dob: new Date(),
        description: '',
        friends: [],
        registrationMethod: RegistrationMethod.LOCAL,
      },
    ],
    registrationMethod: RegistrationMethod.LOCAL,
  },
  {
    id: 7,
    password: 'password',
    email: 'me@me.com',
    timezone: '',
    name: 'Cristian',
    dob: new Date(),
    description: "There's a first for everything",
    friends: [
      {
        id: 1,
        password: 'abc123',
        email: 'gr@ph.ql',
        timezone: '',
        name: 'Bob',
        dob: new Date(),
        description: 'I am very good programmer',
        friends: [],
        registrationMethod: RegistrationMethod.LOCAL,
      },
      {
        id: 12,
        password: 'abc123',
        email: 'tim@green.co',
        timezone: '',
        name: 'Tim',
        dob: new Date(),
        description: '',
        friends: [],
        registrationMethod: RegistrationMethod.LOCAL,
      },
    ],
    registrationMethod: RegistrationMethod.GOOGLE,
  },
  {
    id: 3,
    password: 'password',
    email: 'me@me.com',
    timezone: '',
    name: 'Jose',
    dob: new Date(),
    description: 'What goes up, comes down',
    friends: [
      {
        id: 1,
        password: 'abc123',
        email: 'gr@ph.ql',
        timezone: '',
        name: 'Bob',
        dob: new Date(),
        description: 'I am very good programmer',
        friends: [],
        registrationMethod: RegistrationMethod.LOCAL,
      },
      {
        id: 12,
        password: 'abc123',
        email: 'tim@green.co',
        timezone: '',
        name: 'Tim',
        dob: new Date(),
        description: '',
        friends: [],
        registrationMethod: RegistrationMethod.LOCAL,
      },
    ],
    registrationMethod: RegistrationMethod.GOOGLE,
  },
];
