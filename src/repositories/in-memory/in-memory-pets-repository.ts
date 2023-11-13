import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'

import { PetsRepository } from '../pets-repository'
import {
  PetType,
  PetAge,
  PetSize,
  PetEnergy,
  PetIndependence,
  PetEnvironment,
} from '@/@types/pets'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    return pet || null
  }

  async findManyByCity(
    city: string,
    state: string,
    page: number,
    type?: PetType,
    age?: PetAge,
    size?: PetSize,
    energy?: PetEnergy,
    independence?: PetIndependence,
    environment?: PetEnvironment,
  ) {
    let pets = this.items.filter(
      (item) => item.state === state && item.city === city,
    )

    if (
      !!type ||
      !!age ||
      !!size ||
      !!energy ||
      !!independence ||
      !!environment
    ) {
      pets = pets.filter((pet) => {
        return (
          (!type || pet.type === type) &&
          (!age || pet.age === age) &&
          (!size || pet.size === size) &&
          (!energy || pet.energy === energy) &&
          (!independence || pet.independence === independence) &&
          (!environment || pet.environment === environment)
        )
      })
    }

    const paginatedPets = pets.slice((page - 1) * 20, page * 20)

    return paginatedPets || null
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
