import { productCart } from './productCart.model';
export class sale{
    date: string = '';
    client: string = '';
    totalValue: number = 0;
    paymentMethod: string = '';
    products: Array<productCart> = [];
    pending: boolean = false;
}