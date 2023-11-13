import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Org Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get org profile', async () => {
    const org = await prisma.org.create({
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

    const profileResponse = await request(app.server)
      .get(`/orgs/profile/${org.id}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.org).toEqual(
      expect.objectContaining({
        email: 'org@example.com',
      }),
    )
  })
})
