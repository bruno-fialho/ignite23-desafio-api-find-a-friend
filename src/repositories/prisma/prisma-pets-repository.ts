import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { PetsRepository } from '../pets-repository'
import {
  PetType,
  PetAge,
  PetSize,
  PetEnergy,
  PetIndependence,
  PetEnvironment,
} from '@/@types/pets'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
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
    const pets = await prisma.pet.findMany({
      where: {
        city,
        state,
        type,
        age,
        size,
        energy,
        independence,
        environment,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
