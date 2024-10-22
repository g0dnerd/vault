import { Test, TestingModule } from '@nestjs/testing';
import { DraftScorecardsController } from './draft-scorecards.controller';
import { DraftScorecardsService } from './draft-scorecards.service';

describe('DraftScorecardsController', () => {
  let controller: DraftScorecardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DraftScorecardsController],
      providers: [DraftScorecardsService],
    }).compile();

    controller = module.get<DraftScorecardsController>(
      DraftScorecardsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
