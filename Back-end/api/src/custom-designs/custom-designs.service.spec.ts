import { Test, TestingModule } from '@nestjs/testing';
import { CustomDesignsService } from './custom-designs.service';

describe('CustomDesignsService', () => {
  let service: CustomDesignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomDesignsService],
    }).compile();

    service = module.get<CustomDesignsService>(CustomDesignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
