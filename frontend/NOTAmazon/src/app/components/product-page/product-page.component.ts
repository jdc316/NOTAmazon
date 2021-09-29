import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/CartItem';
import { Product } from 'src/app/common/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product: any;

  constructor(private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartService) { }

  ngOnInit() {
    this.handleRetrieveProduct();
  }

  handleRetrieveProduct() {
    const productId = this.route.snapshot.paramMap.get('id');

    this.productService.getSpecificProduct(productId).subscribe(
      data => {
        if (data !== null) {
          this.product = data;
        }
      }
    );
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);
    const cartItemToAdd = new CartItem(product);
    this.cartService.addToCart(cartItemToAdd);
  }

}
