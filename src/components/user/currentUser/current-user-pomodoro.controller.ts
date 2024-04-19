import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { PomodoroRoundDto } from 'src/components/pomodoro/dto/pomodoro-round.dto'
import { PomodoroSessionDto } from 'src/components/pomodoro/dto/pomodoro-session.dto'
import { PomodoroService } from 'src/components/pomodoro/pomodoro.service'

@Controller('current-user/pomodoro')
export class CurrentUserPomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {}

	@Get('today')
	@Auth()
	findTodaySession(@CurrentUser('id') userId: string) {
		return this.pomodoroService.findTodaySessionByUserId(userId)
	}

	@Auth()
	@HttpCode(200)
	@Post()
	create(@CurrentUser('id') userId: string) {
		return this.pomodoroService.createSessionByUserId(userId)
	}

	@Auth()
	@Put('/round/:id')
	updateRound(@Body() round: PomodoroRoundDto, @Param('id') roundId: string) {
		return this.pomodoroService.updateRoundById(round, roundId)
	}

	@Auth()
	@Put(':id')
	updateSession(
		@CurrentUser('id') userId: string,
		@Body() session: PomodoroSessionDto,
		@Param('id') pomodoroId: string
	) {
		return this.pomodoroService.updateSessionByIdAndUserId(
			session,
			pomodoroId,
			userId
		)
	}

	@Auth()
	@Delete(':id')
	deleteById(
		@CurrentUser('id') userId: string,
		@Param('id') pomodoroId: string
	) {
		return this.pomodoroService.deleteSessionByIdAndUserId(pomodoroId, userId)
	}
}
