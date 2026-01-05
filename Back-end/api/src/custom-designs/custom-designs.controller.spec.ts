import { Test, TestingModule } from '@nestjs/testing';
import { CustomDesignsController } from './custom-designs.controller';

describe('CustomDesignsController', () => {
  let controller: CustomDesignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomDesignsController],
    }).compile();

    controller = module.get<CustomDesignsController>(CustomDesignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
