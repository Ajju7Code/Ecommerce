package com.example.Ecommerce.service;

import com.example.Ecommerce.model.*;
import com.example.Ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    public Order placeOrder(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart is empty"));

        Order order = new Order();
        order.setUser(user);
        order.setProducts(cart.getProducts());

        double totalPrice = cart.getProducts().stream()
                .mapToDouble(Product::getPrice)
                .sum();

        order.setTotalPrice(totalPrice);
        order.setStatus("PLACED");

        cart.getProducts().clear();

        return orderRepository.save(order);
    }

    public List<Order> getOrders(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUser(user);
    }
}