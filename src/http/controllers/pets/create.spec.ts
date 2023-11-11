import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
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
      })

    expect(response.statusCode).toEqual(201)
  })
})
