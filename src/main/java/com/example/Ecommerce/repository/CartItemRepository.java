package com.example.Ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Ecommerce.model.CartItem;
import com.example.Ecommerce.model.Cart;
import com.example.Ecommerce.model.Product;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}
