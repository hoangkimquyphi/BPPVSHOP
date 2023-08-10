import { OrderItem } from "./order-item";

export interface Order {
    id: number;
    user_id: number;
    payment: null;
    status: null;
    order_items: OrderItem[];
}

