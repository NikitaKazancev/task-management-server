import { Body, Controller, Get, Put } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from '../dto/user.dto'
import { UserService } from '../user.service'

@Controller('current-user')
export class CurrentUserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@Auth()
	findProfile(@CurrentUser('id') userId: string) {
		return this.userService.findProfile(userId)
	}

	@Put()
	@Auth()
	update(@CurrentUser('id') userId: string, @Body() user: UserDto) {
		return this.userService.update(userId, user)
	}
}
