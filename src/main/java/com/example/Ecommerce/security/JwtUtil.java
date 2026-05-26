package com.example.Ecommerce.security;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

@Component
public class JwtUtil {
    // 256-bit (32-byte) Base64-encoded secret key
    // This is a secure key that meets the HS256 requirement of minimum 256 bits
    private final String SECRET = "aW5TZWN1cmVKV1RLZXlGb3JIUzI1NkFsZ29yaXRobVNpZ25pbmc=";
    
    private final SecretKey key = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(SECRET));

    public String generateToken(String username)
    {
        return Jwts.builder()
                        .setSubject(username)
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                        .signWith(key, SignatureAlgorithm.HS256)
                        .compact();

    }

    
    public String extractUsername(String token)
    {
        return Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(token)
                        .getBody()
                        .getSubject();
    }

}

