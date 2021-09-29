package com.joshuacunningham.notamazon.service;

import com.joshuacunningham.notamazon.dao.CustomerRepository;
import com.joshuacunningham.notamazon.dto.Purchase;
import com.joshuacunningham.notamazon.dto.PurchaseResponse;
import com.joshuacunningham.notamazon.entity.Customer;
import com.joshuacunningham.notamazon.entity.ProductOrder;
import com.joshuacunningham.notamazon.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // retrieve the order info from dto
        ProductOrder order = purchase.getProductOrder();

        // generate tracking number
        String trackingNumber = generateOrderTrackingNumber();
        order.setTrackingNumber(trackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // populate order with billingAddress + shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // save to the database
        customerRepository.save(customer);

        // return a response
        return new PurchaseResponse(trackingNumber);
    }

    private String generateOrderTrackingNumber() {
        // generate UUID number
        return UUID.randomUUID().toString();
    }
}
