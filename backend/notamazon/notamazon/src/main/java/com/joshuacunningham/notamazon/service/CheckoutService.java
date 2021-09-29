package com.joshuacunningham.notamazon.service;

import com.joshuacunningham.notamazon.dto.Purchase;
import com.joshuacunningham.notamazon.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
