package com.example.Ecommerce.service;

import com.example.Ecommerce.model.*;
import com.example.Ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


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

        if (cart.getCartItems() == null || cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        
        // Extract products from CartItems
        List<Product> products = cart.getCartItems().stream()
                .map(CartItem::getProduct)
                .collect(Collectors.toList());
        order.setProducts(products);

        // Calculate total price: (product price × ordered quantity) for each item
        double totalPrice = cart.getCartItems().stream()
                .mapToDouble(cartItem -> cartItem.getProduct().getPrice() * cartItem.getOrderedQuantity())
                .sum();

        order.setTotalPrice(totalPrice);
        order.setStatus("PLACED");

        // Clear cart items after order
        cart.getCartItems().clear();
        cartRepository.save(cart);

        return orderRepository.save(order);
    }

    public List<Order> getOrders(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUser(user);
    }
}