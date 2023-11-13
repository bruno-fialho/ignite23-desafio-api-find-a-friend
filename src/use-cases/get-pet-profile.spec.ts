import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetProfileUseCase } from './get-pet-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetProfileUseCase(petsRepository)
  })

  it('should be able to get pet profile', async () => {
    const createdPet = await petsRepository.create({
      name: 'Caramelo',
      type: 'DOG',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'MEDIUM',
      independence: 'MEDIUM',
      environment: 'MEDIUM',
      photos: [
        'https://t1.ea.ltmcdn.com/pt/razas/5/3/7/vira-lata-caramelo_735_0_orig.jpg',
      ],
      state: 'RS',
      city: 'Santa Maria',
      requirements: ['Lorem ipsum dolor sit amet'],
      org_id: 'test-id',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('Caramelo')
  })

  it('should not be able to get pet profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
