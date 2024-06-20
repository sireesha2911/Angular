import { CartItem } from './cart-item.model';

export class Cart {
  items: CartItem[] = [];

  addItem(item: CartItem): void {
    // Add logic to check if item already exists and update quantity
    this.items.push(item);
  }

  removeItem(productId: number): void {
    // Remove item from the cart
    this.items = this.items.filter(item => item.productId !== productId);
  }

  clearCart(): void {
    // Clear all items from the cart
    this.items = [];
  }

  getTotalPrice(): number {
    // Calculate total price of all items in the cart
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
