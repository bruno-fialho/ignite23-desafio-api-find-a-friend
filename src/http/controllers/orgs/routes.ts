import { FastifyInstance } from 'fastify'

import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/orgs/profile/:orgId', profile)
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
}
