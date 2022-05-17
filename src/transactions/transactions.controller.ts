import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SendTxDto } from './dtos/send.dto';
import { ITX_SEND } from './interface/tx.inteface';
import { TransactionsService } from './transactions.service';

@ApiTags('Tx Manager')
@Controller('tx')
export class TransactionsController {
  constructor(private readonly txService: TransactionsService) { }


  @ApiResponse({
    status: 200,
    description: 'sent successfully',
  })
  @ApiOperation({ summary: 'send money' })
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('send')
  async send(@Body() input: SendTxDto, @Request() req): Promise<any> {
    const user = await this.txService.sendMoney(input, req.user.name);
    if (user.error) {
      return new BadRequestException(user.error);
    }
    return user;
  }
}
