import { Controller } from '@nestjs/common'
import { PomodoroService } from './pomodoro.service'

@Controller('pomodoro')
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {}
}
