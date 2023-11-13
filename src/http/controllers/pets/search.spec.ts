import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by name with filter', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
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
        requirements: ['Lorem ipsum dolor sit amet'],
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Nala',
        type: 'CAT',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'LOW',
        independence: 'HIGH',
        environment: 'MEDIUM',
        photos: [
          'https://cdn.shopify.com/s/files/1/0500/8965/6473/files/gray-g16b72164c_1920_480x480.jpg?v=1663247513',
        ],
        state: 'RS',
        city: 'Santa Maria',
        requirements: ['Lorem ipsum dolor sit amet'],
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Preto',
        type: 'DOG',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'LOW',
        independence: 'HIGH',
        environment: 'MEDIUM',
        photos: [
          'https://blog.cobasi.com.br/wp-content/uploads/2021/08/vira-lata-filhote-2.png',
        ],
        state: 'SP',
        city: 'São Paulo',
        requirements: ['Lorem ipsum dolor sit amet'],
      })

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        city: 'Santa Maria',
        state: 'RS',
        page: 1,
        type: 'CAT',
        energy: 'LOW',
        independence: 'HIGH',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Nala',
      }),
    ])
  })
})
