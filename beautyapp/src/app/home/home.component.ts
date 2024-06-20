import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BeautyService } from '../beauty.service';
import { BeautyProduct } from '../models/beauty-product.model';
import { CartService } from '../cart.service';
import { CartItem } from '../models/cart-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: BeautyProduct[] = [];
  filteredProducts: BeautyProduct[] = [];
  allTags: string[] = [];
  cartItemCount: number = 0;
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private beautyService: BeautyService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.cartSubscription = this.cartService.getCartUpdates().subscribe(cartItems => {
      this.updateCartItemCount();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  loadProducts(): void {
    this.beautyService.getProducts().subscribe((products: BeautyProduct[]) => {
      this.products = products;
      this.filteredProducts = products;
      const tagsSet = new Set<string>();
      this.products.forEach((product: BeautyProduct) => {
        product.tags.forEach((tag: string) => tagsSet.add(tag));
      });
      this.allTags = Array.from(tagsSet);
      this.updateCartItemCount();
    });
  }

  getRatingArray(rating: number): number[] {
    return Array.from({ length: Math.floor(rating) }, (_, index) => index + 1);
  }

  onProductClick(product: BeautyProduct): void {
    this.router.navigateByUrl(`/product/${product.id}`);
  }

  onSearch(query: string): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }

  onTagClick(tag: string): void {
    this.filteredProducts = this.products.filter(product =>
      product.tags.includes(tag)
    );
  }

  addToCart(product: BeautyProduct): void {
    const item: CartItem = {
      productId: product.id,
      quantity: 1,
      price: product.price,
    };
    this.cartService.addToCart(item);
    this.updateCartItemCount();
  }

  updateCartItemCount(): void {
    this.cartItemCount = this.cartService.getCartItems().length;
  }
}
