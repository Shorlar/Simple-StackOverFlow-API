import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VoteDto } from '../../dto';
import { Question, User, Votes } from '../../entities';
import { VoteCommand } from './command';
import { VoteCommandHandler } from './handler';

describe(`${VoteCommandHandler.name}`, () => {
  let handler: VoteCommandHandler;

  const voteRepository = {
    findOne: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
  };
  const questionRepository = {
    findOne: jest.fn(),
    update: jest.fn(),
  };
  const body = {
    voteType: 'UP',
    questionId: 1,
  } as unknown as VoteDto;

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
  const user = {
    id: 12,
    displayName: 'shola',
    email: 'adeoye@gmail.com',
    aboutMe: null,
    creationDate: '2022-12-20T20:57:37.494Z',
  } as unknown as User;

  const vote = {
    id: 1,
    voteType: 'DOWN',
  };

  const command = new VoteCommand(body, user);
  let updateScoreSpy;
  beforeEach(async () => {
    let module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteCommandHandler,
        {
          provide: getRepositoryToken(Votes),
          useValue: voteRepository,
        },
        {
          provide: getRepositoryToken(Question),
          useValue: questionRepository,
        },
      ],
    }).compile();
    handler = module.get<VoteCommandHandler>(VoteCommandHandler);
    updateScoreSpy = jest.spyOn(handler, 'updateScore');
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(handler).toBeInstanceOf(VoteCommandHandler);
  });

  it('should save new vote successfully', async () => {
    questionRepository.findOne.mockResolvedValue(question);
    voteRepository.findOne.mockResolvedValue(null);
    updateScoreSpy.mockResolvedValue();
    await handler.execute(command);
    expect(questionRepository.findOne).toBeCalled();
    expect(voteRepository.findOne).toBeCalled();
    expect(voteRepository.save).toBeCalled();
    expect(updateScoreSpy).toBeCalled();
  });

  it('should allow alternate vote if vote exists', async () => {
    questionRepository.findOne.mockResolvedValue(question);
    voteRepository.findOne.mockResolvedValue(vote);
    updateScoreSpy.mockResolvedValue();
    await handler.execute(command);
    expect(questionRepository.findOne).toBeCalled();
    expect(voteRepository.findOne).toBeCalled();
    expect(voteRepository.update).toBeCalled();
    expect(updateScoreSpy).toBeCalled();
  });

  it('should throw error if same vote type', async () => {
    questionRepository.findOne.mockResolvedValue(question);
    voteRepository.findOne.mockResolvedValue({
      id: 1,
      voteType: 'UP',
    });
    try {
      await handler.execute(command);
      expect(questionRepository.findOne).toBeCalled();
      expect(voteRepository.findOne).toBeCalled();
    } catch (error) {
      expect(error.message).toEqual('Cannot place same vote type twice');
      expect(error.status).toEqual(400);
    }
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

  it('should throw database error if any when calling questionRepository.findOne', async () => {
    questionRepository.findOne.mockRejectedValue(question);
    try {
      await handler.execute(command);
    } catch (error) {
      expect(error.message).toEqual('Database Error');
      expect(error.status).toEqual(500);
    }
  });

  it('should throw database error if any when calling voteRepository.findOne', async () => {
    questionRepository.findOne.mockResolvedValue(question);
    voteRepository.findOne.mockRejectedValue(vote);
    try {
      await handler.execute(command);
    } catch (error) {
      expect(error.message).toEqual('Database Error');
      expect(error.status).toEqual(500);
    }
  });

  it('should throw database error if any when calling voteRepository.save', async () => {
    questionRepository.findOne.mockResolvedValue(question);
    voteRepository.findOne.mockResolvedValue(null);
    voteRepository.save.mockRejectedValue(null);
    try {
      await handler.execute(command);
    } catch (error) {
      expect(error.message).toEqual('Database Error');
      expect(error.status).toEqual(500);
    }
  });

  it('should throw database error if any when calling voteRepository.update', async () => {
    questionRepository.findOne.mockResolvedValue(question);
    voteRepository.findOne.mockResolvedValue({
      id: 1,
      voteType: 'DOWN',
    });
    voteRepository.update.mockRejectedValue(null);
    try {
      await handler.execute(command);
    } catch (error) {
      expect(error.message).toEqual('Database Error');
      expect(error.status).toEqual(500);
    }
  });
});
