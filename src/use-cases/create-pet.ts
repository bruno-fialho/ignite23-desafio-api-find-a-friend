import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'
// import { PetAlreadyExistsError } from './errors/pets-already-exists-error'
import {
  PetAge,
  PetEnergy,
  PetEnvironment,
  PetIndependence,
  PetSize,
  PetType,
} from '@/@types/pets'

interface CreatePetUseCaseRequest {
  name: string
  type: PetType
  about: string
  age: PetAge
  size: PetSize
  energy: PetEnergy
  independence: PetIndependence
  environment: PetEnvironment
  photos?: string[]
  state: string
  city: string
  requirements?: string[]
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    type,
    about,
    age,
    size,
    energy,
    independence,
    environment,
    photos,
    state,
    city,
    requirements,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      type,
      about,
      age,
      size,
      energy,
      independence,
      environment,
      photos,
      state,
      city,
      requirements,
      org_id: orgId || 'failed',
    })

    return {
      pet,
    }
  }
}
