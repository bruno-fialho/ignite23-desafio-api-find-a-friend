import { expect, describe, it, beforeEach } from 'vitest'

import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
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
      orgId: 'test-id',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
