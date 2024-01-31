import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class OrderDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsPositive()
  amountPaid: number;
  @ApiProperty({ type: Object })
  @IsOptional()
  deliveryAddress: object;
  @ApiProperty({ type: String })
  @IsOptional()
  paymentId: string;
  @ApiProperty({ type: [Object] })
  @IsOptional()
  orderedProducts: object[];
}
