import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { TopPageModel } from './top-page.model/top-page.model'
import { FindTopPageDto } from './dto/find-top-page.dto'

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {
    console.log()
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    console.log()
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log()
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPageModel) {
    console.log()
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {
    console.log()
  }
}
