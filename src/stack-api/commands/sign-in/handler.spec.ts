import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities';
import { SignInCommandHandler } from './handler';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from '../../dto';
import { SignInCommand } from './command';
import { ErrorMessages } from '../../shared';
jest.mock('bcryptjs');

describe(`${SignInCommandHandler.name}`, () => {
  let handler: SignInCommandHandler;

  const repository = {
    findOne: jest.fn(),
  };

  const jwtService = {
    sign: jest.fn(),
  };

  const requestBody = {
    email: 'test1@gmail.com',
    password: '1234testhy',
  } as unknown as SignInDto;

  const command = new SignInCommand(requestBody);

  const user = {
    displayName: 'tesName',
    email: 'test1@gmail.com',
    password: '***********',
    aboutMe: '',
    creationDate: new Date(),
  };

  let bcryptCompare = jest.fn().mockResolvedValue(true);
  (bcrypt.compare as jest.Mock) = bcryptCompare;

  beforeEach(async () => {
    let module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInCommandHandler,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();
    handler = module.get<SignInCommandHandler>(SignInCommandHandler);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(handler).toBeInstanceOf(SignInCommandHandler);
  });

  it('should sign in user', async () => {
    repository.findOne.mockResolvedValue(user);
    jwtService.sign.mockResolvedValue(true);
    await handler.execute(command);
    expect.assertions(3);
    expect(repository.findOne).toBeCalled();
    expect(bcryptCompare).toBeCalled();
    expect(jwtService.sign).toBeCalled();
  });

  it('should throw error if user does not exist', async () => {
    repository.findOne.mockResolvedValue(null);
    try {
      await handler.execute(command);
      expect(repository.findOne).toBeCalled();
    } catch (error) {
      expect(error.message).toEqual(ErrorMessages.INVALID_USER);
      expect(error.status).toEqual(400);
    }
  });

  it('should throw error if password does not match', async () => {
    repository.findOne.mockResolvedValue(user);
    bcryptCompare = jest.fn().mockResolvedValue(false);
    try {
      await handler.execute(command);
      expect(repository.findOne).toBeCalled();
    } catch (error) {
      expect(error.message).toEqual(ErrorMessages.INVALID_USER);
      expect(error.status).toEqual(400);
    }
  });

  it('should throw database error if any', async () => {
    repository.findOne.mockRejectedValue(user);
    try {
      await handler.execute(command);
      expect(repository.findOne).toBeCalled();
    } catch (error) {
      expect(error.message).toEqual(ErrorMessages.DATABASE_ERROR);
      expect(error.status).toEqual(500);
    }
  });
});
