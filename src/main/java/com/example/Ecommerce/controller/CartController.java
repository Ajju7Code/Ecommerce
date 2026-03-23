package com.example.Ecommerce.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Ecommerce.model.Cart;
import com.example.Ecommerce.service.CartService;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService service;

    @PostMapping("/user/cart/add/{id}")
    public Cart add(@PathVariable Long id, Authentication auth) {
        return service.addToCart(auth.getName(), id);
    }

    @GetMapping("/user/cart")
    public Cart get(Authentication auth) {
        return service.getCart(auth.getName());
    }
}