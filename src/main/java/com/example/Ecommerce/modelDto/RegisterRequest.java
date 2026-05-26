package com.example.Ecommerce.modelDto;

import com.example.Ecommerce.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String username;
    private String password;
    private String email;
    private Role role;
}
