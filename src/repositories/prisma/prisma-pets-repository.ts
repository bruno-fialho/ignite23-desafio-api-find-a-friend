import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findByCity(city: string, state: string) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        state,
      },
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
