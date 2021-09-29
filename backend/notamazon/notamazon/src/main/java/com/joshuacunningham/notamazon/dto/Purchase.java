package com.joshuacunningham.notamazon.dto;

import com.joshuacunningham.notamazon.entity.Address;
import com.joshuacunningham.notamazon.entity.Customer;
import com.joshuacunningham.notamazon.entity.ProductOrder;
import com.joshuacunningham.notamazon.entity.OrderItem;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private ProductOrder productOrder;
    private Set<OrderItem> orderItems;
}
