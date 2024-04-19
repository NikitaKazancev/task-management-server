import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TimeBlockController } from './time-block.controller'
import { TimeBlockRepository } from './time-block.repository'
import { TimeBlockService } from './time-block.service'

@Module({
	controllers: [TimeBlockController],
	providers: [TimeBlockService, PrismaService, TimeBlockRepository],
	exports: [TimeBlockService, TimeBlockRepository],
})
export class TimeBlockModule {}
