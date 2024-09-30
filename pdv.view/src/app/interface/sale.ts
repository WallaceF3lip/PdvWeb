import { productCart } from "../models/productCart.model"

export interface Isale {
    id: string
    date: Date
    client: string
    totalValue: number
    products: Array<productCart>
    pending: boolean
}