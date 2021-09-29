package com.joshuacunningham.notamazon.dao;

import com.joshuacunningham.notamazon.entity.ProductOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface OrderRepository  extends JpaRepository<ProductOrder, Long> {
    Page<ProductOrder> findByCustomerEmailOrderByDateCreatedDesc(@Param("email") String email, Pageable pageable);
}
