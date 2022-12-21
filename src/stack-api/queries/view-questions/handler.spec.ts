import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ViewQuestionsQueryDto } from '../../dto';
import { Question } from '../../entities';
import { ErrorMessages } from '../../shared';
import { ViewQuestionsQueryHandler } from './handler';
import { ViewQuestionsQuery } from './query';

describe(`${ViewQuestionsQueryHandler.name}`, () => {
  let handler: ViewQuestionsQueryHandler;

  const repository = {
    find: jest.fn(),
  };

  const param = {
    limit: 20,
    offset: 2,
  } as unknown as ViewQuestionsQueryDto;

  const query = new ViewQuestionsQuery(param);

  beforeEach(async () => {
    let module: TestingModule = await Test.createTestingModule({
      providers: [
        ViewQuestionsQueryHandler,
        {
          provide: getRepositoryToken(Question),
          useValue: repository,
        },
      ],
    }).compile();
    handler = module.get<ViewQuestionsQueryHandler>(ViewQuestionsQueryHandler);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(handler).toBeInstanceOf(ViewQuestionsQueryHandler);
  });

  it('should fetch questions succesfully', async () => {
    repository.find.mockResolvedValue([]);
    await handler.execute(query);
    expect(repository.find).toBeCalled();
  });

  it('should throw databse error if any', async () => {
    repository.find.mockRejectedValue([]);
    try {
      await handler.execute(query);
      expect(repository.find).toBeCalled();
    } catch (error) {
      expect(error.message).toEqual(ErrorMessages.DATABASE_ERROR);
      expect(error.status).toEqual(500);
    }
  });
});
