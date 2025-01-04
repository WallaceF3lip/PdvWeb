import { PaymentMethodModel } from './PaymentMethodModel.modal';
import { productCart } from './productCart.model';
export class sale{
    date: string = '';
    client: string = '';
    totalValue: number = 0;
    paymentMethod: PaymentMethodModel = new PaymentMethodModel();
    products: Array<productCart> = [];
    pending: boolean = false;
    address: string = '';
    delivery: boolean = false;
    deliveryTime: Date = new Date();
}