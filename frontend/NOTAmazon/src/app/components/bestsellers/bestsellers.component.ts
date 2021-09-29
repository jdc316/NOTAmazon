import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/CartItem';
import { Product } from 'src/app/common/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-bestsellers',
  templateUrl: './bestsellers.component.html',
  styleUrls: ['./bestsellers.component.css']
})
export class BestsellersComponent implements OnInit {

  products: any;

  constructor(private productService: ProductService, 
    private route: ActivatedRoute, 
    private router: Router,
    private cartService: CartService) { }

  ngOnInit() { 
    // just retrieve one of each category for "best sellers" & "new releases" (to save time)
    // if time permits, add a tag field in API to signify tags like "new release" or "best seller"
    this.products = [];
    this.handleRetrieveProduct(1);
    this.handleRetrieveProduct(12);
    this.handleRetrieveProduct(18);
    this.handleRetrieveProduct(22);
    this.handleRetrieveProduct(25);
  }

  handleRetrieveProduct(productId: any) {
    this.productService.getSpecificProduct(productId).subscribe(
      data => {
        if (data !== null) {
          this.products.push(data);
        }
      }
    );
  }

  handleProductClick(product: Product) {
    this.router.navigate(['/product-page/' + product.id]);
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);
    const cartItemToAdd = new CartItem(product);
    this.cartService.addToCart(cartItemToAdd);
  }

}
