import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Pet Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet profile', async () => {
    const { orgId } = await createAndAuthenticateOrg(app)

    const pet = await prisma.pet.create({
      data: {
        name: 'Caramelo',
        type: 'DOG',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'MEDIUM',
        independence: 'MEDIUM',
        environment: 'MEDIUM',
        photos: [
          'https://t1.ea.ltmcdn.com/pt/razas/5/3/7/vira-lata-caramelo_735_0_orig.jpg',
        ],
        state: 'RS',
        city: 'Santa Maria',
        requirements: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        ],
        org_id: orgId,
      },
    })

    const profileResponse = await request(app.server)
      .get(`/pets/profile/${pet.id}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.pet).toEqual(
      expect.objectContaining({
        name: 'Caramelo',
      }),
    )
  })
})
