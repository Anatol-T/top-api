import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { CreateReviewDto } from '../src/review/dto/create-review.dto'
import { Types, disconnect } from 'mongoose'
import { REVIEW_NOT_FOUND } from '../src/review/review.constants'

const productId = new Types.ObjectId().toHexString()
const loginDto = {
  login: 'test@mail.ru',
  password: '1',
}

describe('AuthController (e2e)', () => {
  let app: INestApplication
  let access_token: string
  let token: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        access_token = body.access_token
        expect(access_token).toBeDefined()
      })
  })
  it('/auth/login (POST) - failed password', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '2' })
      .expect(401, {
        statusCode: 401,
        message: 'Wrong password',
        error: 'Unauthorized',
      })
  })
  it('/auth/login (POST) - failed login', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: '2' })
      .expect(401, {
        statusCode: 401,
        message: 'User not found',
        error: 'Unauthorized',
      })
  })

  afterAll(() => {
    disconnect()
  })
})
