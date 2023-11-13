import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetPetProfileUseCase } from '@/use-cases/factories/make-get-pet-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profilePetsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = profilePetsParamsSchema.parse(request.params)

  const getPetProfile = makeGetPetProfileUseCase()

  const { pet } = await getPetProfile.execute({
    petId,
  })

  return reply.status(200).send({
    pet,
  })
}
