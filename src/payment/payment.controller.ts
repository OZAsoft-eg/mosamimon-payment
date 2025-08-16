import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateCheckoutDto } from './create-checkout.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkoutId')
  async createCheckoutId(@Body() createCheckoutDto: CreateCheckoutDto) {
    return this.paymentService.createPayment(createCheckoutDto);
  }

  @Get('paymentStatus/:checkoutId')
  async getPaymentStatus(@Param('checkoutId') checkoutId: string) {
    return this.paymentService.getPaymentStatus(checkoutId);
  }
  
}
