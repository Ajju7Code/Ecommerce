package com.example.Ecommerce.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Ecommerce.model.Product;
import com.example.Ecommerce.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @PostMapping("/admin/products")
    public Product add(@RequestBody Product p) {
        return service.addProduct(p);
    }

    @GetMapping("/user/products")
    public List<Product> get() {
        return service.getAllProducts();
    }
}