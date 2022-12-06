import { Module } from '@nestjs/common'
import { ReviewController } from './review.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { ReviewModel } from './review.model/review.model'
import { ReviewService } from './review.service'
import { TelegramModule } from '../telegram/telegram.module'

@Module({
  controllers: [ReviewController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModel,
        schemaOptions: {
          collection: 'Review',
        },
      },
    ]),
    TelegramModule,
  ],
  providers: [ReviewService],
})
export class ReviewModule {}
