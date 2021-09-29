package com.joshuacunningham.notamazon.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="customer")
@Getter
@Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private Set<ProductOrder> productOrders = new HashSet<>();

    public void add(ProductOrder productOrder) {
        if (productOrder != null) {
            if (productOrders == null) {
                productOrders = new HashSet<>();
            }

            productOrders.add(productOrder);
            productOrder.setCustomer(this);
        }
    }
}
