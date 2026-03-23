package com.example.Ecommerce.service;

import org.springframework.stereotype.Service;

import com.example.Ecommerce.model.Cart;
import com.example.Ecommerce.model.Product;
import com.example.Ecommerce.model.User;
import com.example.Ecommerce.repository.CartRepository;
import com.example.Ecommerce.repository.ProductRepository;
import com.example.Ecommerce.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Cart addToCart(String username, Long productId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return newCart;
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cart.getProducts().add(product);

        return cartRepository.save(cart);
    }

    public Cart getCart(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    }
}