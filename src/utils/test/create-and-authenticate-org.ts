import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const response = await prisma.org.create({
    data: {
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      person_responsible: 'John Doe',
      cep: '12345-678',
      address: 'Acme Street, 123',
      latitude: 12.3456,
      longitude: -34.5678,
      whatsapp: '11987654321',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'org@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    orgId: response.id,
  }
}
