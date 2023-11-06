import { FastifyInstance } from 'fastify'

import { register } from './register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
}
