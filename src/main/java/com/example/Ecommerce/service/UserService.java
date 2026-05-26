package com.example.Ecommerce.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Ecommerce.model.Role;
import com.example.Ecommerce.model.User;
import com.example.Ecommerce.modelDto.LoginRequest;
import com.example.Ecommerce.modelDto.RegisterRequest;
import com.example.Ecommerce.repository.UserRepository;
import com.example.Ecommerce.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public String login(LoginRequest request) {

    User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

        return jwtUtil.generateToken(user.getUsername());
    }
    public String register(RegisterRequest request) {

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "User already exists";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : Role.USER);

        userRepository.save(user);

        return "User registered successfully";
    }

    
}
    

