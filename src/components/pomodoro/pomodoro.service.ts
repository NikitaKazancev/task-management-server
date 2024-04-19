import { Injectable, NotFoundException } from '@nestjs/common'
import { PomodoroRoundDto } from './dto/pomodoro-round.dto'
import { PomodoroSessionDto } from './dto/pomodoro-session.dto'
import { PomodoroRepository } from './pomodoro.repository'

@Injectable()
export class PomodoroService {
	constructor(private readonly pomodoroRepository: PomodoroRepository) {}

	async findTodaySessionByUserId(userId: string) {
		const today = new Date().toISOString().split('T')[0]

		return await this.pomodoroRepository.findFirstSessionWithRoundsByUserIdAndDate(
			userId,
			new Date(today)
		)
	}

	async createSessionByUserId(userId: string) {
		const todaySession = await this.findTodaySessionByUserId(userId)

		if (todaySession) return todaySession

		const userTimer =
			await this.pomodoroRepository.findTimerSettingsByUserId(userId)

		if (!userTimer) throw new NotFoundException('User timer not found')

		return await this.pomodoroRepository.createSessionByUserId(
			userId,
			Array.from({ length: userTimer.intervalsCount }, () => ({
				totalSeconds: 0,
			}))
		)
	}

	async updateSessionByIdAndUserId(
		pomodoro: PomodoroSessionDto,
		pomodoroId: string,
		userId: string
	) {
		return await this.pomodoroRepository.updateSessionByIdAndUserId(
			pomodoro,
			pomodoroId,
			userId
		)
	}

	async updateRoundById(round: Partial<PomodoroRoundDto>, roundId: string) {
		return await this.pomodoroRepository.updateRoundById(round, roundId)
	}

	async deleteSessionByIdAndUserId(pomodoroId: string, userId: string) {
		return await this.pomodoroRepository.deleteSessionByIdAndUserId(
			pomodoroId,
			userId
		)
	}
}
