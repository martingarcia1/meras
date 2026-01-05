import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomDesignsController } from './custom-designs.controller';
import { CustomDesignsService } from './custom-designs.service';
import { CustomDesign } from './entities/custom-design.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomDesign])],
  controllers: [CustomDesignsController],
  providers: [CustomDesignsService],
  exports: [CustomDesignsService, TypeOrmModule],
})
export class CustomDesignsModule {}
