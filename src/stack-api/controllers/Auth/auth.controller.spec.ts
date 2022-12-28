import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { SignInCommand, SignUpCommand } from '../../commands';
import { SignInDto, SignUpDto } from '../../dto';
import { AuthController } from './auth.controller';

describe('SignUpController', () => {
  let controller: AuthController;

  const commandBus = {
    execute: jest.fn(),
  };

  const signUpBody = {
    displayName: 'testName',
    email: 'test@gmail.com',
    password: '1234test',
    aboutMe: '',
  } as unknown as SignUpDto;

  const signInBody = {
    email: 'test@gmail.com',
    password: '1234test',
  } as unknown as SignInDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: CommandBus, useValue: commandBus }],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(AuthController);
  });

  it('should call sign up command successfully', async () => {
    await controller.signUp(signUpBody);
    expect(commandBus.execute).toBeCalled();
    expect(commandBus.execute).toBeCalledWith(new SignUpCommand(signUpBody));
  });

  it('should call sign-in command successfully', async () => {
    await controller.signIn(signInBody);
    expect(commandBus.execute).toBeCalled();
    expect(commandBus.execute).toBeCalledWith(new SignInCommand(signInBody));
  });
});
