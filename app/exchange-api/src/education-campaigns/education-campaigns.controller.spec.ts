import { Test, TestingModule } from '@nestjs/testing';
import { EducationCampaignsController } from './education-campaigns.controller';

describe('EducationCampaignsController', () => {
  let controller: EducationCampaignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationCampaignsController],
    }).compile();

    controller = module.get<EducationCampaignsController>(EducationCampaignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
