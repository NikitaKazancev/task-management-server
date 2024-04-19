import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PomodoroRoundDto } from './dto/pomodoro-round.dto'
import { PomodoroSessionDto } from './dto/pomodoro-session.dto'

@Injectable()
export class PomodoroRepository {
	constructor(private readonly prisma: PrismaService) {}

	findFirstSessionWithRoundsByUserIdAndDate(userId: string, date: Date) {
		return this.prisma.pomodoroSession.findFirst({
			where: {
				createdAt: {
					gte: date,
				},
			},
			include: {
				rounds: {
					orderBy: {
						id: 'desc',
					},
				},
			},
		})
	}

	findTimerSettingsByUserId(userId: string) {
		return this.prisma.userTimer.findUnique({
			where: {
				userId,
			},
		})
	}

	createSessionByUserId(userId: string, rounds: PomodoroRoundDto[]) {
		return this.prisma.pomodoroSession.create({
			data: {
				rounds: {
					createMany: {
						data: rounds,
					},
				},
				user: {
					connect: {
						id: userId,
					},
				},
			},
			include: {
				rounds: true,
			},
		})
	}

	updateSessionByIdAndUserId(
		pomodoro: Partial<PomodoroSessionDto>,
		pomodoroId: string,
		userId: string
	) {
		return this.prisma.pomodoroSession.update({
			data: pomodoro,
			where: {
				id: pomodoroId,
				userId,
			},
		})
	}

	updateRoundById(round: Partial<PomodoroRoundDto>, roundId: string) {
		return this.prisma.pomodoroRound.update({
			where: {
				id: roundId,
			},
			data: round,
		})
	}

	deleteSessionByIdAndUserId(pomodoroId: string, userId: string) {
		return this.prisma.pomodoroSession.delete({
			where: {
				id: pomodoroId,
				userId,
			},
		})
	}
}
