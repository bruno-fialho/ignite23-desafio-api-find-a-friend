import type { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'
import {
  PetType,
  PetAge,
  PetSize,
  PetEnergy,
  PetIndependence,
  PetEnvironment,
} from '@/@types/pets'

interface SearchPetsUseCaseRequest {
  city: string
  state: string
  page: number
  type?: PetType
  age?: PetAge
  size?: PetSize
  energy?: PetEnergy
  independence?: PetIndependence
  environment?: PetEnvironment
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    state,
    page,
    type,
    age,
    size,
    energy,
    independence,
    environment,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(
      city,
      state,
      page,
      type,
      age,
      size,
      energy,
      independence,
      environment,
    )

    return {
      pets,
    }
  }
}
