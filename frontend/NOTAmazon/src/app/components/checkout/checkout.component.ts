import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/CartItem';
import { Order } from 'src/app/common/Order';
import { OrderItem } from 'src/app/common/OrderItems';
import { Purchase } from 'src/app/common/Purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  checkoutFormReady = false;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  creditCardYears: number[] = [2021,2022,2023,2024,2025,2026,2027,2028,2029];
  creditCardMonths: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];

  shippingAddressStates  = '';
  billingAddressStates  = '';
    
  storage: Storage = sessionStorage;

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }
              ngOnInit(): void {
    
                this.reviewCartDetails();
            
                // read the user's email address from browser storage
                let e = this.storage.getItem('userEmail') ?? "";
                let theEmail = "";
            
                if (e === "") {
                  theEmail = "filler@email.com";
                } else {
                  theEmail = JSON.parse(e);
                }

                this.checkoutFormGroup = this.formBuilder.group({
                  customer: this.formBuilder.group({
                    firstName: new FormControl('', 
                                          [Validators.required, 
                                           Validators.minLength(2)]),
            
                    lastName:  new FormControl('', 
                                          [Validators.required, 
                                           Validators.minLength(2)]),
                                           
                    email: new FormControl(theEmail,
                                          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
                  }),
                  shippingAddress: this.formBuilder.group({
                    street: new FormControl('', [Validators.required, Validators.minLength(2)]),
                    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
                    state: new FormControl('', [Validators.required]),
                    // country: new FormControl('', [Validators.required]),
                    zipCode: new FormControl('', [Validators.required, Validators.minLength(2)])
                  }),
                  billingAddress: this.formBuilder.group({
                    street: new FormControl('', [Validators.required, Validators.minLength(2)]),
                    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
                    state: new FormControl('', [Validators.required]),
                    // country: new FormControl('', [Validators.required]),
                    zipCode: new FormControl('', [Validators.required, Validators.minLength(2)])
                  }),
                  creditCard: this.formBuilder.group({
                    // cardType: new FormControl('', [Validators.required]),
                    nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2)]),
                    cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
                    securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
                    // expirationMonth: [''],
                    // expirationYear: ['']
                  })
                });
            
                // populate credit card months
            
                const startMonth: number = new Date().getMonth() + 1;
                console.log("startMonth: " + startMonth);
            
            
                // populate credit card years
            
           
            
                // populate countries
            
                this.checkoutFormReady = true;
              }
            
              reviewCartDetails() {
            
                // subscribe to cartService.totalQuantity
                this.cartService.totalQuantity.subscribe(
                  totalQuantity => this.totalQuantity = totalQuantity
                );
            
                // subscribe to cartService.totalPrice
                this.cartService.totalPrice.subscribe(
                  totalPrice => this.totalPrice = totalPrice
                );
            
              }
            
              get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
              get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
              get email() { return this.checkoutFormGroup.get('customer.email'); }
            
              get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
              get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
              get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
              get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
            
              get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
              get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
              get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
              get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
            
              get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
              get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
              get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
              get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
            
            
            
              copyShippingAddressToBillingAddress(event: any) {

                if (event.checked) {
                  this.checkoutFormGroup.controls.billingAddress
                        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);            
                }
                else {
                  this.checkoutFormGroup.controls.billingAddress.reset();
                }
                
              }
            
              onSubmit() {
                console.log("Handling the submit button");
            
                if (this.checkoutFormGroup.invalid) {
                  console.log("checkout form invalid for some reason")
                  console.log(this.findInvalidControls());
                  this.checkoutFormGroup.markAllAsTouched();
                  return;
                }
            
                // set up order
                let order = new Order();
                order.totalPrice = this.totalPrice;
                order.totalQuantity = this.totalQuantity;
            
                // get cart items
                const cartItems = this.cartService.productsInCart;
            
                // - short way of doing the same thingy
                let orderItems: OrderItem[] = cartItems.map((tempCartItem: CartItem) => new OrderItem(tempCartItem));
            
                // set up purchase
                let purchase = new Purchase();
                
                // populate purchase - customer
                purchase.customer = this.checkoutFormGroup.controls['customer'].value;
                
                // populate purchase - shipping address
                purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
                const shippingState = purchase?.shippingAddress?.state;
                const shippingCountry = "USA";
                purchase!.shippingAddress!.state = shippingState ?? "";
                purchase!.shippingAddress!.country = shippingCountry;
            
                // populate purchase - billing address
                purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
                const billingState = purchase?.billingAddress?.state;
                const billingCountry = "USA";
                purchase!.billingAddress!.state = billingState ?? "";
                purchase!.billingAddress!.country = billingCountry;
              
                // populate purchase - order and orderItems
                purchase.order = order;
                purchase.orderItems = orderItems;
            
                console.log(purchase);
                this.resetCart();
                // call REST API via the CheckoutService
                // this.checkoutService.placeOrder(purchase).subscribe({
                //     next: response => {
                //       alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
            
                //       // reset cart
                //       this.resetCart();
            
                //     },
                //     error: err => {
                //       alert(`There was an error: ${err.message}`);
                //     }
                //   }
                // );
            
              }

              public findInvalidControls() {
                const invalid = [];
                const controls = this.checkoutFormGroup.controls;
                for (const name in controls) {
                    if (controls[name].invalid) {
                        invalid.push(name);
                    }
                }
                return invalid;
            }
            
              resetCart() {
                // reset cart data
                this.cartService.productsInCart = [];
                this.cartService.totalPrice.next(0);
                this.cartService.totalQuantity.next(0);
                
                // reset the form
                this.checkoutFormGroup.reset();
            
                // navigate back to the products page
                this.router.navigateByUrl("/products");
              }
            
              handleMonthsAndYears() {
            
                const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
            
                const currentYear: number = new Date().getFullYear();
                const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
            
                // if the current year equals the selected year, then start with the current month
            
                let startMonth: number;
            
                if (currentYear === selectedYear) {
                  startMonth = new Date().getMonth() + 1;
                }
                else {
                  startMonth = 1;
                }
            
              }
            
              getStates(formGroupName: string) {
            
                const formGroup = this.checkoutFormGroup.get(formGroupName);
            
                const countryCode = formGroup?.value.country.code;
                const countryName = formGroup?.value.country.name;
            
                console.log(`${formGroupName} country code: ${countryCode}`);
                console.log(`${formGroupName} country name: ${countryName}`);
            
            
              }
            }
