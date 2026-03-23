package com.example.Ecommerce.controller;

import com.example.Ecommerce.model.Order;
import com.example.Ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @PostMapping("/user/order")
    public Order place(Authentication auth) {
        return service.placeOrder(auth.getName());
    }

    @GetMapping("/user/orders")
    public List<Order> get(Authentication auth) {
        return service.getOrders(auth.getName());
    }
}