package com.example.Ecommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Ecommerce.model.Product;
import com.example.Ecommerce.repository.ProductRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}