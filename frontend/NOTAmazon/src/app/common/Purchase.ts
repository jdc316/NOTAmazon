import { Address } from "./Address";
import { Customer } from "./Customer";
import { Order } from "./Order";
import { OrderItem } from "./OrderItems";

export class Purchase {
    customer?: Customer;
    shippingAddress?: Address;
    billingAddress?: Address;
    order?: Order;
    orderItems?: OrderItem[]; 
}