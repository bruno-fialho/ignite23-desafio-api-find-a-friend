import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      email: 'org@example.com',
      password: '123456',
      person_responsible: 'John Doe',
      cep: '12345-678',
      address: 'Acme Street, 123',
      latitude: 12.3456,
      longitude: -34.5678,
      whatsapp: '11987654321',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'org@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
