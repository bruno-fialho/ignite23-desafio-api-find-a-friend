import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets', async () => {
    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Bob',
      type: 'DOG',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      age: 'BABY',
      size: 'SMALL',
      energy: 'MEDIUM',
      independence: 'LOW',
      environment: 'SMALL',
      photos: [
        'https://blog.cobasi.com.br/wp-content/uploads/2021/08/vira-lata-filhote-2.png',
      ],
      state: 'SP',
      city: 'São Paulo',
      requirements: ['Lorem ipsum dolor sit amet'],
      org_id: 'test-i-2',
    })

    const { pets } = await sut.execute({
      city: 'Santa Maria',
      state: 'RS',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Caramelo' })])
  })

  it('should be able to fetch paginated pet search', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Caramelo ${i}`,
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
    }

    const { pets } = await sut.execute({
      city: 'Santa Maria',
      state: 'RS',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Caramelo 21' }),
      expect.objectContaining({ name: 'Caramelo 22' }),
    ])
  })

  it('should be able to search for pets with filters', async () => {
    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Nala',
      type: 'CAT',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'LOW',
      independence: 'HIGH',
      environment: 'MEDIUM',
      photos: [
        'https://cdn.shopify.com/s/files/1/0500/8965/6473/files/gray-g16b72164c_1920_480x480.jpg?v=1663247513',
      ],
      state: 'RS',
      city: 'Santa Maria',
      requirements: ['Lorem ipsum dolor sit amet'],
      org_id: 'test-id-2',
    })

    await petsRepository.create({
      name: 'Preto',
      type: 'DOG',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'LOW',
      independence: 'HIGH',
      environment: 'MEDIUM',
      photos: [
        'https://blog.cobasi.com.br/wp-content/uploads/2021/08/vira-lata-filhote-2.png',
      ],
      state: 'SP',
      city: 'São Paulo',
      requirements: ['Lorem ipsum dolor sit amet'],
      org_id: 'test-id-3',
    })

    const { pets } = await sut.execute({
      city: 'Santa Maria',
      state: 'RS',
      page: 1,
      type: 'CAT',
      energy: 'LOW',
      independence: 'HIGH',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Nala' })])
  })
})
