import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TXN_PURPOSE } from "../../typeorm/entities/enums";

export class SendTxDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reciever: string;

  @ApiProperty({ enum: TXN_PURPOSE })
  @IsNotEmpty()
  @IsEnum(TXN_PURPOSE)
  purpose: TXN_PURPOSE;

  @ApiProperty()
  @IsNotEmpty()
  metadata: any;
}