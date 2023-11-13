import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetOrgProfileUseCase } from '@/use-cases/factories/make-get-org-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileOrgsParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const { orgId } = profileOrgsParamsSchema.parse(request.params)

  const getOrgProfile = makeGetOrgProfileUseCase()

  const { org } = await getOrgProfile.execute({
    orgId,
  })

  return reply.status(200).send({
    org,
  })
}
