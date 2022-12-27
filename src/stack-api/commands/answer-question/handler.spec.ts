import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnswerQuestionDto } from '../../dto';
import { Answer, Question, User } from '../../entities';
import { ErrorMessages } from '../../shared';
import { AnswerQuestionComand } from './comand';
import { AnswerQuestionComandHandler } from './handler';

describe(`${AnswerQuestionComandHandler.name}`, () => {
  let handler: AnswerQuestionComandHandler;

  const answerNotification = {
    emit: jest.fn(),
  };

  const questionRepository = {
    findOne: jest.fn(),
  };

  const answerRepository = {
    save: jest.fn(),
  };

  const question = {
    id: 1,
    title: 'How to use git',
    userDisplayName: 'shola15',
    questionBody: 'Here is a summary',
    score: 0,
    creationDate: '2022-12-23T10:18:26.778Z',
    user: {
      id: 12,
      displayName: 'shola',
      email: 'adeoye@gmail.com',
      aboutMe: null,
      creationDate: '2022-12-20T20:57:37.494Z',
    },
  };

  const body = {
    questionId: 1,
    answer: 'helo',
  } as unknown as AnswerQuestionDto;

  const user = {
    id: 12,
    displayName: 'shola',
    email: 'adeoye@gmail.com',
    aboutMe: null,
    creationDate: '2022-12-20T20:57:37.494Z',
  } as unknown as User;

  const command = new AnswerQuestionComand(body, user);

  beforeEach(async () => {
    let module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerQuestionComandHandler,
        {
          provide: getRepositoryToken(Answer),
          useValue: answerRepository,
        },
        {
          provide: getRepositoryToken(Question),
          useValue: questionRepository,
        },
        {
          provide: 'NOTIFICATION',
          useValue: answerNotification,
        },
      ],
    }).compile();
    handler = module.get<AnswerQuestionComandHandler>(
      AnswerQuestionComandHandler,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(handler).toBeInstanceOf(AnswerQuestionComandHandler);
  });

  it('should save answer to a question successfully', async () => {
    questionRepository.findOne.mockResolvedValue(question);
    answerRepository.save.mockResolvedValue(true);
    const response = await handler.execute(command);
    expect(questionRepository.findOne).toBeCalled();
    expect(questionRepository.findOne).resolves;
    expect(answerRepository.save).toBeCalled();
    expect(answerRepository).resolves;
    expect(answerNotification.emit).toBeCalled();
    expect(response).toEqual('Successful');
  });

  it('Should throw error if question id is not valid', async () => {
    questionRepository.findOne.mockResolvedValue(null);
    try {
      await handler.execute(command);
      expect(questionRepository.findOne).toBeCalled();
      expect(questionRepository.findOne).resolves;
    } catch (error) {
      expect(error.message).toEqual('Invalid Question ID');
      expect(error.status).toEqual(400);
    }
  });

  it('Should catch error if any when fetching question', async () => {
    questionRepository.findOne.mockRejectedValue(question);
    try {
      await handler.execute(command);
      expect(questionRepository.findOne).toBeCalled();
      expect(questionRepository.findOne).rejects;
    } catch (error) {
      expect(error.message).toEqual(ErrorMessages.DATABASE_ERROR);
      expect(error.status).toEqual(500);
    }
  });

  it('Should catch error if any when saving answer', async () => {
    questionRepository.findOne.mockResolvedValue(question);
    answerRepository.save.mockRejectedValue(true);
    try {
      await handler.execute(command);
      expect(questionRepository.findOne).toBeCalled();
      expect(questionRepository.findOne).resolves;
      expect(answerRepository.save).toBeCalled();
      expect(answerRepository.save).rejects;
    } catch (error) {
      expect(error.message).toEqual(ErrorMessages.DATABASE_ERROR);
      expect(error.status).toEqual(500);
    }
  });
});
