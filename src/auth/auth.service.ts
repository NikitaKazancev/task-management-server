import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'
import { Response } from 'express'
import { UserService } from 'src/components/user/user.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
		private readonly configService: ConfigService
	) {}

	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'
	DOMAIN = this.configService.get<string>('DOMAIN')

	async login(dto: AuthDto) {
		const { password, ...user } = await this.validateUser(dto)
		const tokens = this.issueTokens(user.email)

		return {
			user,
			...tokens,
		}
	}

	async register(dto: AuthDto) {
		const dbUser = await this.userService.findByEmail(dto.email)
		if (dbUser) throw new ConflictException('User already exists')

		const { createdUser: user, timer } = await this.userService.create(dto)

		const tokens = this.issueTokens(user.email)

		return {
			user: { ...user, timer },
			...tokens,
		}
	}

	private issueTokens(email: string) {
		const data = { email }

		const accessToken = this.jwtService.sign(data, {
			expiresIn: '1h',
		})

		const refreshToken = this.jwtService.sign(data, {
			expiresIn: '7d',
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const dbUser = await this.userService.findByEmail(dto.email)
		if (!dbUser) throw new NotFoundException('User not found')

		const isValid = await verify(dbUser.password, dto.password)
		if (!isValid) throw new UnauthorizedException('Invalid password')

		return dbUser
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: this.DOMAIN,
			expires: expiresIn,
			secure: true,
			sameSite: 'lax',
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: this.DOMAIN,
			expires: new Date(0),
			secure: true,
			sameSite: 'lax',
		})
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwtService.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid refresh token')

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.userService.findByEmail(
			result.email
		)

		const tokens = this.issueTokens(user.email)

		return {
			user,
			...tokens,
		}
	}
}
