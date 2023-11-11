import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    type: z.enum(['DOG', 'CAT', 'OTHER']).default('DOG'),
    about: z.string().max(300),
    age: z.enum(['BABY', 'ADULT', 'OLD']).default('ADULT'),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).default('MEDIUM'),
    energy: z
      .enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'])
      .default('MEDIUM'),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
    environment: z.enum(['SMALL', 'MEDIUM', 'BIG']).default('MEDIUM'),
    photos: z.array(z.string()),
    state: z.string(),
    city: z.string(),
    requirements: z.array(z.string()),
  })

  const {
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
  } = createBodySchema.parse(request.body)

  const createUseCase = makeCreatePetUseCase()

  const response = await createUseCase.execute({
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
    orgId: request.user.sub,
  })

  return reply.status(201).send()
}
