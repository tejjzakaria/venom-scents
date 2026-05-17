'use server';

import {
  submitOrder,
  generateOrderNumber,
  type CreateOrderBody,
} from '../../lib/api';

type BundleItem = {
  id:            string;
  slug:          string;
  name:          string;
  image:         string;
  originalPrice: number | null;
};

type PlaceOrderInput = {
  items:     BundleItem[];
  unitPrice: number;
  customer: {
    name:    string;
    phone:   string;
    address: string;
    payment: string;
  };
};

export async function placeOrder(input: PlaceOrderInput): Promise<{ orderId: string; orderNumber: string }> {
  const { items, unitPrice, customer } = input;
  const orderNumber = generateOrderNumber();

  const orderItems = items.map(p => ({
    productId:     p.id,
    productSlug:   p.slug,
    productName:   p.name,
    productImage:  p.image,
    price:         unitPrice,
    originalPrice: p.originalPrice ?? unitPrice,
    quantity:      1,
    subtotal:      unitPrice,
  }));

  const total    = unitPrice * items.length;
  const subtotal = orderItems.reduce((s, i) => s + i.originalPrice, 0);

  const body: CreateOrderBody = {
    orderNumber,
    customerName:    customer.name,
    customerPhone:   customer.phone,
    customerAddress: customer.address,
    paymentMethod:   customer.payment,
    status:          'pending',
    items:           orderItems,
    subtotal,
    savings:         subtotal - total,
    total,
  };

  return submitOrder(body);
}
