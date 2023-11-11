import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findByCity(city: string, state: string): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
