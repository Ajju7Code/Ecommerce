# Ecommerce API - Postman Testing Guide

## API Base URL
```
http://localhost:8080
```

---

## 1. User Registration

### Register as ADMIN
**POST** `http://localhost:8080/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "admin_user",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

**Expected Response (200 OK):**
```
User registered successfully
```

---

### Register as USER
**POST** `http://localhost:8080/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "regular_user",
  "email": "user@example.com",
  "password": "user123",
  "role": "USER"
}
```

**Expected Response (200 OK):**
```
User registered successfully
```

---

## 2. Login & Get JWT Token

### Login as ADMIN
**POST** `http://localhost:8080/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "admin_user",
  "password": "admin123"
}
```

**Expected Response (200 OK):**
```json
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbl91c2VyIiwiaWF0IjoxNjg2OTIzNDU2LCJleHAiOjE2ODY5OTk0NTZ9.XXXXX...
```

**Save this token as `ADMIN_TOKEN` for use in subsequent requests**

---

### Login as USER
**POST** `http://localhost:8080/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "regular_user",
  "password": "user123"
}
```

**Expected Response (200 OK):**
```
JWT Token (save as USER_TOKEN)
```

---

## 3. Test Role-Based Authorization

### 3.1 Admin-Only Endpoint: Add Product

**POST** `http://localhost:8080/admin/products`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{ADMIN_TOKEN}}
```

**Body (JSON):**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "quantity": 10
}
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "quantity": 10
}
```

**Test Authorization Failure:**
- Try the same request with `USER_TOKEN` instead of `ADMIN_TOKEN`
- Expected Response: **403 Forbidden** (access denied)

---

### 3.2 User Endpoint: Get All Products

**GET** `http://localhost:8080/user/products`

**Headers:**
```
Authorization: Bearer {{USER_TOKEN}}
```

**Expected Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "quantity": 10
  }
]
```

**Test Authorization Failure:**
- Try without Authorization header
- Expected Response: **401 Unauthorized** (missing token)

---

### 3.3 User Endpoint: Add to Cart

**POST** `http://localhost:8080/user/cart/add/1`

**Headers:**
```
Authorization: Bearer {{USER_TOKEN}}
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "username": "regular_user",
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99
    }
  ]
}
```

---

### 3.4 User Endpoint: Get Cart

**GET** `http://localhost:8080/user/cart`

**Headers:**
```
Authorization: Bearer {{USER_TOKEN}}
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "username": "regular_user",
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99
    }
  ]
}
```

---

### 3.5 User Endpoint: Place Order

**POST** `http://localhost:8080/user/order`

**Headers:**
```
Authorization: Bearer {{USER_TOKEN}}
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "username": "regular_user",
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99
    }
  ],
  "totalPrice": 999.99,
  "status": "CONFIRMED"
}
```

---

### 3.6 User Endpoint: Get All Orders

**GET** `http://localhost:8080/user/orders`

**Headers:**
```
Authorization: Bearer {{USER_TOKEN}}
```

**Expected Response (200 OK):**
```json
[
  {
    "id": 1,
    "username": "regular_user",
    "products": [...],
    "totalPrice": 999.99,
    "status": "CONFIRMED"
  }
]
```

---

## 4. Authorization Test Cases

| Endpoint | Method | Required Role | Test with ADMIN | Test with USER | Test without Token |
|----------|--------|---|---|---|---|
| /auth/register | POST | None | ✅ 200 | ✅ 200 | ✅ 200 |
| /auth/login | POST | None | ✅ 200 (Token) | ✅ 200 (Token) | ✅ 200 |
| /admin/products | POST | ADMIN | ✅ 200 | ❌ 403 | ❌ 401 |
| /user/products | GET | USER | ✅ 200 | ✅ 200 | ❌ 401 |
| /user/cart/add/{id} | POST | USER | ✅ 200 | ✅ 200 | ❌ 401 |
| /user/cart | GET | USER | ✅ 200 | ✅ 200 | ❌ 401 |
| /user/order | POST | USER | ✅ 200 | ✅ 200 | ❌ 401 |
| /user/orders | GET | USER | ✅ 200 | ✅ 200 | ❌ 401 |

---

## 5. Postman Environment Setup

In Postman, create an environment variable:

1. Click **Environment** (top right) → **Create new**
2. Name it `Ecommerce_Local`
3. Add variables:
   - `base_url`: `http://localhost:8080`
   - `admin_token`: (leave blank, will be filled after login)
   - `user_token`: (leave blank, will be filled after login)

Then use in requests:
- URL: `{{base_url}}/auth/login`
- Authorization: `Bearer {{admin_token}}`

---

## 6. Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Missing or invalid token | Verify Authorization header is `Bearer {token}` |
| 403 Forbidden | User lacks required role | Use ADMIN_TOKEN for /admin/*, USER_TOKEN for /user/* |
| JWT signature error | Secret key mismatch | Ensure JwtUtil uses the correct 256-bit key |
| InvalidKeyException | Key is not 256 bits | Regenerate key using `Keys.secretKeyFor(SignatureAlgorithm.HS256)` |

---

## 7. Quick Testing Steps

1. **Start application**: `mvn spring-boot:run`
2. **Register Admin**: POST /auth/register with ADMIN role
3. **Register User**: POST /auth/register with USER role
4. **Login Admin**: POST /auth/login, copy token
5. **Add Product**: POST /admin/products with ADMIN token
6. **Login User**: POST /auth/login, copy token
7. **Get Products**: GET /user/products with USER token
8. **Add to Cart**: POST /user/cart/add/1 with USER token
9. **Place Order**: POST /user/order with USER token
10. **Get Orders**: GET /user/orders with USER token

---

## 8. Curl Commands (Alternative to Postman)

```bash
# Register Admin
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin_user","email":"admin@example.com","password":"admin123","role":"ADMIN"}'

# Login Admin
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin_user","password":"admin123"}'

# Add Product (save token from login response)
curl -X POST http://localhost:8080/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"name":"Laptop","description":"High-performance","price":999.99,"quantity":10}'

# Get Products as User
curl -X GET http://localhost:8080/user/products \
  -H "Authorization: Bearer YOUR_USER_TOKEN"
```

