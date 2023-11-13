import {
  PetAge,
  PetEnergy,
  PetEnvironment,
  PetIndependence,
  PetSize,
  PetType,
} from '@/@types/pets'
import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyByCity(
    city: string,
    state: string,
    page: number,
    type?: PetType,
    age?: PetAge,
    size?: PetSize,
    energy?: PetEnergy,
    independence?: PetIndependence,
    environment?: PetEnvironment,
  ): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
