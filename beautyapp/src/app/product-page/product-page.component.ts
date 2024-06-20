import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeautyService } from '../beauty.service';
import { BeautyProduct } from '../models/beauty-product.model';
import { CartItem } from '../models/cart-item.model';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  productId!: number;
  product: BeautyProduct | undefined;
  cartItemCount: number = 0;
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private beautyService: BeautyService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.beautyService.getProductById(this.productId).subscribe(product => {
          this.product = product;
        });
      }
    });
    this.cartItemCount = this.cartService.getCartItems().length;
    this.cartSubscription = this.cartService.getCartUpdates().subscribe(cartItems => {
      this.cartItemCount = cartItems.length;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  addToCart(): void {
    if (this.product) {
      const item: CartItem = {
        productId: this.product.id,
        quantity: 1,
        price: this.product.price,
      };
      this.cartService.addToCart(item);
      this.router.navigateByUrl('/cart');
    }
  }

  continueShopping(): void {
    this.router.navigateByUrl('/home');
  }

  getRatingArray(rating: number): number[] {
    return Array.from({ length: Math.floor(rating) }, (_, index) => index + 1);
  }
}
