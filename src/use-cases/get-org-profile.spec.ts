import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetOrgProfileUseCase } from './get-org-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get org profile', async () => {
    const createdOrg = await orgsRepository.create({
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      person_responsible: 'John Doe',
      cep: '12345-678',
      address: 'Acme Street, 123',
      latitude: 12.3456,
      longitude: -34.5678,
      whatsapp: '11987654321',
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.email).toEqual('org@example.com')
  })

  it('should not be able to get org profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
