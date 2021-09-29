import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BestsellersComponent } from "./components/bestsellers/bestsellers.component";
import { CartComponent } from "./components/cart/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ProductListTableComponent } from "./components/product-list/product-list-table/product-list-table.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductPageComponent } from "./components/product-page/product-page.component";

const AppRoutes: Routes = [
    { path: 'home', component: ProductListTableComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: 'category/:id', component: ProductListTableComponent },
    { path: 'search/:keyword', component: ProductListTableComponent },
    { path: 'category', component: ProductListTableComponent },
    { path: 'best-sellers', component: BestsellersComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'product-list-table', component: ProductListTableComponent },
    { path: 'product-page', component: ProductPageComponent },
    { path: 'product-page/:id', component: ProductPageComponent },
    { path: '', redirectTo: '/product-list-table', pathMatch: 'full'},
    { path: '**', redirectTo: '/product-list-table', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes, {useHash: true, relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})

export class AppRoutingModule { }