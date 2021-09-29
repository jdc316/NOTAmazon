import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/CartItem';
import { Product } from 'src/app/common/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list-table',
  templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list-table.component.css']
})
export class ProductListTableComponent implements OnInit {

  products: Product[] = [];
  categoryId = 0;
  productId = 0;
  prevCategoryId = 0;
  searching = false;
  pageNumber = 0;
  pageSize = 12;
  totalElements = 0;
  totalPages = 0;
  prevKeyword: any = null;

  constructor(private productService: ProductService, 
              private route: ActivatedRoute, 
              private router: Router,
              private cartService: CartService) { }

  ngOnInit() {
    this.productId = 0;
    this.handleRetrieveProducts();
  }

  handleRetrieveProducts() {
    this.route.paramMap.subscribe(() => {
      this.searching = this.route.snapshot.paramMap.has('keyword');

      if (this.searching) {
        this.searchProducts();
      } else {
        this.getListProducts();
      }
    });
  }

  searchProducts() {
    const keyword = this.route.snapshot.paramMap.get('keyword');
    
    if (this.prevKeyword != keyword) {
      this.pageNumber = 0;
    }

    this.prevKeyword = keyword;

    this.productService.searchProductList(keyword, this.pageNumber, this.pageSize).subscribe(
      data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number;
        this.pageSize = data.page.size;
        this.totalPages = data.page.totalPages;
        this.totalElements = data.page.totalElements;
      }
    );
  }

  getListProducts() {
    if (this.route?.snapshot?.paramMap?.has('id')) {
      // @ts-ignore: Object is possibly 'null'
      this.categoryId = +this.route.snapshot.paramMap.get('id');
    } 

    if (this.prevCategoryId != this.categoryId) {
      this.pageNumber = 0;
    }

    this.productService.getProductList(this.categoryId, this.pageNumber, this.pageSize).subscribe(
      data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number;
        this.pageSize = data.page.size;
        this.totalPages = data.page.totalPages;
        this.totalElements = data.page.totalElements;
      }
    );
  }

  handlePageChange(event: any) {
    console.log(event);
    this.pageNumber = event.pageIndex;
    this.handleRetrieveProducts();
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
