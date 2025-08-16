import { IsString, IsNumber, IsEmail, IsOptional } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  testMode: string;

  @IsNumber()
  amount: number;

  @IsString()
  merchantTransactionId: string;

  @IsEmail()
  'customer.email': string;

  @IsString()
  'customer.givenName': string;

  @IsString()
  'customer.surname': string;

  @IsString()
  'billing.city': string;

  @IsString()
  'billing.state': string;

  @IsString()
  'billing.country': string;

  @IsString()
  'billing.street1': string;

  @IsString()
  'billing.postcode': string;
}
