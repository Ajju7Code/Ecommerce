package com.example.Ecommerce.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Ecommerce.modelDto.LoginRequest;
import com.example.Ecommerce.modelDto.RegisterRequest;
import com.example.Ecommerce.service.UserService;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService service;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest r) {
        return service.register(r);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest r) {
        return service.login(r);
    }
}