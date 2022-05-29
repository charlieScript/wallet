import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@Controller()
export class AppController {
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async health() {
    return 'works';
  }
}
