import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
const prisma = new PrismaClient()
async function main() {
	const admin1 = await prisma.user.upsert({
		where: { email: 'admin@1c.ru' },
		update: {},
		create: {
			email: 'admin@1c.ru',
			name: 'Admin',
			password: await hash('admin1c'),
			role: 'ADMIN',
		},
	})

	const timer1 = await prisma.userTimer.upsert({
		where: { userId: admin1.id },
		update: {},
		create: {
			userId: admin1.id,
		},
	})

	const admin2 = await prisma.user.upsert({
		where: { email: 'admin@ya.ru' },
		update: {},
		create: {
			email: 'admin@ya.ru',
			name: 'Admin',
			password: await hash('adminya'),
			role: 'ADMIN',
		},
	})

	const timer2 = await prisma.userTimer.upsert({
		where: { userId: admin2.id },
		update: {},
		create: {
			userId: admin2.id,
		},
	})

	console.log({ admin1: { admin1, timer1 }, admin2: { admin2, timer2 } })
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
