import { Controller, Delete, Get, Param } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth('ADMIN')
	@Get()
	findAll() {
		return this.userService.findAll()
	}

	@Auth('ADMIN')
	@Delete(':id')
	deleteById(@Param('id') userId: string) {
		return this.userService.deleteById(userId)
	}
}
