import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities';
import { SignUpCommandHandler } from './sign-up.handler';
import * as bcrypt from 'bcryptjs';
import { SignUpCommand } from './sign-up.command';
import { SignUpDto } from '../../dto';
import { ConfigService } from '@nestjs/config';
import { ErrorMessages } from '../../shared';
jest.mock('bcryptjs');

describe(`${SignUpCommandHandler.name}`, () => {
  let handler: SignUpCommandHandler;

  const jwtService = {
    sign: jest.fn(),
  };

  const repository = {
    save: jest.fn(),
  };

  const bcryptHash = jest.fn().mockResolvedValue(true);
  (bcrypt.hash as jest.Mock) = bcryptHash;

  let bcryptGenSalt = jest.fn().mockResolvedValue(true);
  (bcrypt.genSalt as jest.Mock) = bcryptGenSalt;

  const user = {
    displayName: 'tesName',
    email: 'test1@gmail.com',
    password: '1234testhy',
    aboutMe: '',
  } as unknown as SignUpDto;

  const command = new SignUpCommand(user);

  const newUser = {
    displayName: 'tesName',
    email: 'test1@gmail.com',
    password: '***********',
    aboutMe: '',
    creationDate: new Date(),
  };

  beforeEach(async () => {
    let module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpCommandHandler,
        ConfigService,
        { provide: JwtService, useValue: jwtService },
        { provide: getRepositoryToken(User), useValue: repository },
      ],
    }).compile();
    handler = module.get<SignUpCommandHandler>(SignUpCommandHandler);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(handler).toBeInstanceOf(SignUpCommandHandler);
  });

  it('should hash password and create user successfully', async () => {
    jwtService.sign.mockResolvedValue(true);
    repository.save.mockResolvedValue(newUser);
    await handler.execute(command);
    expect.assertions(4);
    expect(jwtService.sign).toBeCalled();
    expect(bcryptGenSalt).toBeCalled();
    expect(bcryptHash).toBeCalled();
    expect(repository.save).toBeCalled();
  });

  it('Should catch error if any when hashing password', async () => {
    bcryptGenSalt = jest.fn().mockRejectedValue(false);
    try {
      await handler.execute(command);
    } catch (error) {
      expect(error.message).toEqual(ErrorMessages.ENCRYPTION_ERROR);
      expect(error.status).toEqual(500);
    }
  });

  it('should catch error from database', async () => {
    repository.save.mockRejectedValue(newUser);
    try {
      await handler.execute(command);
    } catch (error) {
      expect(error.message).toEqual(ErrorMessages.DATABASE_ERROR);
      expect(error.status).toEqual(500);
    }
  });
});
