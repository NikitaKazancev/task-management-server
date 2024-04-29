import { UseGuards, applyDecorators } from '@nestjs/common'
import { Role } from '@prisma/client'
import { OnlyAdminGuard } from '../guards/admin.quard'
import { JwtGuard } from '../guards/jwt.guard'

export const Auth = (role: Role = Role.USER) => {
	if (role === Role.ADMIN) {
		return applyDecorators(UseGuards(JwtGuard, OnlyAdminGuard))
	}

	return applyDecorators(UseGuards(JwtGuard))
}
