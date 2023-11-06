import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaOrgsRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
