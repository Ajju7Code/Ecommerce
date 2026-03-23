package com.example.Ecommerce.modelDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {
    private String username;
    private String password;
    
}
