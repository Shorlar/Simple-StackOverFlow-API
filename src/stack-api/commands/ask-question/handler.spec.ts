import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AskQuestionDto } from '../../dto';
import { Question, User } from '../../entities';
import { ErrorMessages } from '../../shared';
import { AskQuestionCommand } from './command';
import { AskQuestionCommandHandler } from './handler';

describe(`${AskQuestionCommandHandler.name}`, () => {
  let handler: AskQuestionCommandHandler;

  const repository = {
    save: jest.fn(),
  };

  const question = {
    title: 'How to use git',
    question: 'Here is a summary',
  } as unknown as AskQuestionDto;

  const user = {
    id: 12,
    displayName: 'shola',
    email: 'adeoye@gmail.com',
    aboutMe: null,
    creationDate: '2022-12-20T20:57:37.494Z',
  } as unknown as User;

  const command = new AskQuestionCommand(question, user);

  const createdQuestion = {
    title: 'How to use git',
    questionBody: 'Here is a summary',
    user: {
      id: 12,
      displayName: 'shola15',
      email: 'adeoye15@gmail.com',
      aboutMe: null,
      creationDate: '2022-12-20T20:57:37.494Z',
    },
    userDisplayName: 'shola15',
    id: 1,
    score: 0,
    creationDate: '2022-12-23T10:18:26.778Z',
  };

  beforeEach(async () => {
    let module: TestingModule = await Test.createTestingModule({
      providers: [
        AskQuestionCommandHandler,
        {
          provide: getRepositoryToken(Question),
          useValue: repository,
        },
      ],
    }).compile();
    handler = module.get<AskQuestionCommandHandler>(AskQuestionCommandHandler);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(handler).toBeInstanceOf(AskQuestionCommandHandler);
  });

  it('Should save question successfully', async () => {
    repository.save.mockResolvedValue(createdQuestion);
    await handler.execute(command);
    expect(repository.save).toBeCalled();
    expect(repository.save).resolves;
  });

  it('Should throw database error if any', async () => {
    repository.save.mockRejectedValue(createdQuestion);
    try {
      await handler.execute(command);
      expect(repository.save).toBeCalled();
    } catch (error) {
      expect(error.message).toEqual(ErrorMessages.DATABASE_ERROR);
      expect(error.status).toEqual(500);
    }
  });
});
