import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOrgProfileUseCaseRequest {
  orgId: string
}

interface GetOrgProfileUseCaseResponse {
  org: Omit<Org, 'password_hash'>
}

export class GetOrgProfileUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...orgWithoutPasswordHash } = org

    return {
      org: orgWithoutPasswordHash,
    }
  }
}
