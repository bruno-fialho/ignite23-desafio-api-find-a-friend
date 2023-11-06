import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/orgs-already-exists-error'

interface RegisterUseCaseRequest {
  email: string
  password: string
  person_responsible: string
  cep: string
  address: string
  latitude: number
  longitude: number
  whatsapp: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
    person_responsible,
    cep,
    address,
    latitude,
    longitude,
    whatsapp,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      email,
      password_hash,
      person_responsible,
      cep,
      address,
      latitude,
      longitude,
      whatsapp,
    })

    return {
      org,
    }
  }
}
