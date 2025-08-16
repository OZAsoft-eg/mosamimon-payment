import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { CreateCheckoutDto } from './create-checkout.dto';

const ENTITY_ID = 'entityId';
const PAYMENT_TYPE = 'paymentType';
const CURRENCY = 'currency'

@Injectable()
export class PaymentService {
  // Test Server credentials, can be updated for the Production Server
  private readonly accessToken = 'OGFjN2E0Yzc5NDgzMDkyNjAxOTQ4MzY2MzY1ZDAxMTZ8NnpwP1Q9Y3dGTiUyYWN6NmFmQWo=';
  private readonly entityId = '8ac7a4c79483092601948366b9d1011b'; // Id representing the recipient organization (Mosamimon/Abo Nawaf)
  private readonly paymentType = 'DB'; // Direct Debit
  private readonly currency = 'SAR'; // Saudi Riyal
  private readonly apiUrl = 'https://eu-test.oppwa.com/v1/checkouts';  // Payment baseUrl


  private readonly headers = {
    Authorization: `Bearer ${this.accessToken}`,
    // 'Content-Type': 'application/x-www-form-urlencoded',
  };

  constructor() {}

  private async axiosRequest(config: AxiosRequestConfig) {
    try {
      console.log(`Payload ${config.data}`);
      const response = await axios(config);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Request failed:', error.response || error.message);
      throw new Error('Payment request failed');
    }
  }

  // [1] Get Checkout Id
  async createPayment(createCheckoutDto: CreateCheckoutDto) {
    const payload = new URLSearchParams();
    Object.entries(createCheckoutDto).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        payload.append(key, String(value));
      }
   });
    payload.append(ENTITY_ID, this.entityId);
    payload.append(PAYMENT_TYPE, this.paymentType);
    payload.append(CURRENCY, this.currency);
    // payload.append('merchantTransactionId', '123123123');  // TODO: to be discussed with Zeko & Abdo

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: this.apiUrl,
      headers: this.headers,
      data: payload,
    };

    const paymentData = await this.axiosRequest(config);

    return {
      message: paymentData.result.description,
      checkoutId: paymentData.id,
    };
  }

  // [3] Get Payment Status
  async getPaymentStatus(checkoutId: string) {
    const payload = new URLSearchParams();
    payload.append(ENTITY_ID, this.entityId);

    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.apiUrl}/${checkoutId}/payment`,
      headers: this.headers,
      params: payload,
    };

    const statusData = await this.axiosRequest(config);

    return {
      status: statusData.result.description,
    };
  }
}
