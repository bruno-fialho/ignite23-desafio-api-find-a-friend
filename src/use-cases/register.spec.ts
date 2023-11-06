import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/orgs-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute({
      email: 'org@example.com',
      password: '123456',
      person_responsible: 'John Doe',
      cep: '12345-678',
      address: 'Acme Street, 123',
      latitude: 12.3456,
      longitude: -34.5678,
      whatsapp: '11987654321',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      email: 'org@example.com',
      password: '123456',
      person_responsible: 'John Doe',
      cep: '12345-678',
      address: 'Acme Street, 123',
      latitude: 12.3456,
      longitude: -34.5678,
      whatsapp: '11987654321',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'org@example.com'

    await sut.execute({
      email,
      password: '123456',
      person_responsible: 'John Doe',
      cep: '12345-678',
      address: 'Acme Street, 123',
      latitude: 12.3456,
      longitude: -34.5678,
      whatsapp: '11987654321',
    })

    await expect(() =>
      sut.execute({
        email,
        password: '123456',
        person_responsible: 'John Doe',
        cep: '12345-678',
        address: 'Acme Street, 123',
        latitude: 12.3456,
        longitude: -34.5678,
        whatsapp: '11987654321',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
