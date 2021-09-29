import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isExpanded = true;
  numberOfItemsInCart = 15;
  cartCost = 19.99;
  productSearch: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.totalQuantity.subscribe(
      data => {
        this.numberOfItemsInCart = data;
      }
    );

    this.cartService.totalPrice.subscribe(
      data => {
        this.cartCost = data;
      }
    );
  }

  handleCartNav() {
    this.router.navigate(['/cart']);
  }

  searchProducts() {
    // console.log(`/#/search/${this.productSearch}`);
    // this.router.navigateByUrl(`/#/search/${value}`);
    this.router.navigate([`/search/${this.productSearch}`])
  }
}
