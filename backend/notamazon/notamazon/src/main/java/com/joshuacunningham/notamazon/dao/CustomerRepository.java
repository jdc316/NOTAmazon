package com.joshuacunningham.notamazon.dao;

import com.joshuacunningham.notamazon.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email);
}
