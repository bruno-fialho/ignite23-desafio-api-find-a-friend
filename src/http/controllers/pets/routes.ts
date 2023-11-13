import { FastifyInstance } from 'fastify'

import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/search', search)
  app.post('/pets', { onRequest: [verifyJwt] }, create)
}
