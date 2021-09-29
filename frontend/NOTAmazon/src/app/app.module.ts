import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListTableComponent } from './components/product-list/product-list-table/product-list-table.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './routes.routing';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { BestsellersComponent } from './components/bestsellers/bestsellers.component';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutService } from './services/checkout.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductListTableComponent,
    NavbarComponent,
    ProductPageComponent,
    BestsellersComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatBadgeModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [ProductService, CartService, CheckoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
