import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'

import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    return pet || null
  }

  async findByCity(city: string, state: string) {
    const pets = this.items.filter(
      (item) => item.state === state && item.city === city,
    )

    return pets || null
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      type: data.type,
      about: data.about,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independence: data.independence,
      environment: data.environment,
      photos: (data.photos ?? []) as string[],
      state: data.state,
      city: data.city,
      requirements: (data.requirements ?? []) as string[],
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
