import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { UserDto } from './dto/user.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async findByEmail(email: string) {
		return await this.userRepository.findByEmail(email)
	}

	async findProfile(userId: string) {
		const {
			pomodoro,
			tasks,
			timer,
			user: { password, ...user },
		} = await this.userRepository.findProfile(userId)

		return {
			user,
			timer,
			pomodoro,
			tasks,
		}
	}

	async create(authData: AuthDto) {
		const user = {
			email: authData.email,
			name: '',
			password: await hash(authData.password),
		}

		const {
			password,
			timer: { userId, ...timer },
			...createdUser
		} = await this.userRepository.create(user)

		return {
			createdUser,
			timer,
		}
	}

	async update(userId: string, user: UserDto) {
		let data = user

		if (data.password) {
			data = { ...data, password: await hash(data.password) }
		}

		if (!(user.breakInterval || user.intervalsCount || user.workInterval)) {
			return this.userRepository.update(userId, data)
		}

		return this.userRepository.updateSettings(userId, data)
	}
}
