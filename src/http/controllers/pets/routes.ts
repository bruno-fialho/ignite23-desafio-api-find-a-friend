import { FastifyInstance } from 'fastify'

import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { profile } from './profile'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/search', search)
  app.get('/pets/profile/:petId', profile)
  app.post('/pets', { onRequest: [verifyJwt] }, create)
}
