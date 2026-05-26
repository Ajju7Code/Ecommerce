package com.example.Ecommerce.service;

import org.springframework.stereotype.Service;

import com.example.Ecommerce.model.Cart;
import com.example.Ecommerce.model.CartItem;
import com.example.Ecommerce.model.Product;
import com.example.Ecommerce.model.User;
import com.example.Ecommerce.repository.CartRepository;
import com.example.Ecommerce.repository.CartItemRepository;
import com.example.Ecommerce.repository.ProductRepository;
import com.example.Ecommerce.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Cart addToCart(String username, Long productId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if product already exists in cart
        CartItem existingCartItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElse(null);

        if (existingCartItem != null) {
            // Product already in cart, increment quantity
            existingCartItem.setOrderedQuantity(existingCartItem.getOrderedQuantity() + 1);
            cartItemRepository.save(existingCartItem);
        } else {
            // New product, create CartItem with quantity 1
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setOrderedQuantity(1);
            cartItemRepository.save(cartItem);
        }

        return cartRepository.findByUser(user).orElse(cart);
    }

    public Cart getCart(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    }
}