import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pet-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    page: z.coerce.number().min(1).default(1),
    type: z.enum(['DOG', 'CAT', 'OTHER']).default('DOG').optional(),
    age: z.enum(['BABY', 'ADULT', 'OLD']).default('ADULT').optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).default('MEDIUM').optional(),
    energy: z
      .enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'])
      .default('MEDIUM')
      .optional(),
    independence: z
      .enum(['LOW', 'MEDIUM', 'HIGH'])
      .default('MEDIUM')
      .optional(),
    environment: z
      .enum(['SMALL', 'MEDIUM', 'BIG'])
      .default('MEDIUM')
      .optional(),
  })

  const {
    city,
    state,
    page,
    type,
    age,
    size,
    energy,
    independence,
    environment,
  } = searchPetsQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    state,
    page,
    type,
    age,
    size,
    energy,
    independence,
    environment,
  })

  return reply.status(200).send({
    pets,
  })
}
