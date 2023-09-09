import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryService } from './CategoryService';
import { CategoryController } from './category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
