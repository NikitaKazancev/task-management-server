import { IsArray, IsString } from 'class-validator'

export class TimeBlockUpdateOrderDto {
	@IsArray()
	@IsString({ each: true })
	ids: string[]
}
