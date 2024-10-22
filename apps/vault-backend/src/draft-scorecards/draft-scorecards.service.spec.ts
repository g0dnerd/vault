import { Test, TestingModule } from '@nestjs/testing';
import { DraftScorecardsService } from './draft-scorecards.service';

describe('DraftScorecardsService', () => {
  let service: DraftScorecardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DraftScorecardsService],
    }).compile();

    service = module.get<DraftScorecardsService>(DraftScorecardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
