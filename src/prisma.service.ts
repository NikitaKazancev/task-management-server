import { OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		super({
			transactionOptions: {
				maxWait: 5000,
				timeout: 10000,
			},
		})
	}
	async onModuleInit() {
		await this.$connect()
	}
}
