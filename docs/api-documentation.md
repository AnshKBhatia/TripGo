# TripGo API Documentation

Welcome to the TripGo API documentation. This guide provides comprehensive information about all available endpoints, authentication methods, and data structures.

## Base URL
```
Production: https://api.tripgo.com/v1
Development: http://localhost:3000/api/v1
```

## Authentication

TripGo uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

### Authentication Endpoints

#### Register New User
```http
POST /auth/register
```

**Request Body:**
```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string"
}
```

**Response (201 Created):**
```json
{
    "status": "success",
    "data": {
        "userId": "string",
        "username": "string",
        "email": "string",
        "token": "string"
    }
}
```

#### User Login
```http
POST /auth/login
```

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response (200 OK):**
```json
{
    "status": "success",
    "data": {
        "token": "string",
        "user": {
            "id": "string",
            "username": "string",
            "email": "string"
        }
    }
}
```

## Trip Management

### Create Trip
```http
POST /trips
```

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "destination": "string",
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD",
    "title": "string",
    "description": "string",
    "participants": ["userId1", "userId2"],
    "budget": {
        "amount": "number",
        "currency": "string"
    },
    "activities": [{
        "name": "string",
        "date": "YYYY-MM-DD",
        "location": "string",
        "cost": "number"
    }]
}
```

**Response (201 Created):**
```json
{
    "status": "success",
    "data": {
        "tripId": "string",
        "destination": "string",
        "startDate": "YYYY-MM-DD",
        "endDate": "YYYY-MM-DD",
        "createdAt": "timestamp"
    }
}
```

### Get All Trips
```http
GET /trips
```

**Query Parameters:**
```
page: number (default: 1)
limit: number (default: 10)
sortBy: string (default: "createdAt")
order: "asc" | "desc" (default: "desc")
```

**Response (200 OK):**
```json
{
    "status": "success",
    "data": {
        "trips": [{
            "id": "string",
            "destination": "string",
            "startDate": "YYYY-MM-DD",
            "endDate": "YYYY-MM-DD",
            "status": "string"
        }],
        "pagination": {
            "currentPage": "number",
            "totalPages": "number",
            "totalItems": "number"
        }
    }
}
```

### Get Trip Details
```http
GET /trips/:tripId
```

**Response (200 OK):**
```json
{
    "status": "success",
    "data": {
        "trip": {
            "id": "string",
            "destination": "string",
            "startDate": "YYYY-MM-DD",
            "endDate": "YYYY-MM-DD",
            "title": "string",
            "description": "string",
            "participants": [{
                "userId": "string",
                "username": "string"
            }],
            "activities": [{
                "id": "string",
                "name": "string",
                "date": "YYYY-MM-DD",
                "location": "string",
                "cost": "number"
            }],
            "budget": {
                "amount": "number",
                "currency": "string",
                "spent": "number"
            }
        }
    }
}
```

### Update Trip
```http
PUT /trips/:tripId
```

**Request Body:** (All fields optional)
```json
{
    "destination": "string",
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD",
    "title": "string",
    "description": "string",
    "budget": {
        "amount": "number",
        "currency": "string"
    }
}
```

**Response (200 OK):**
```json
{
    "status": "success",
    "data": {
        "trip": {
            "id": "string",
            "updatedAt": "timestamp"
        }
    }
}
```

### Delete Trip
```http
DELETE /trips/:tripId
```

**Response (200 OK):**
```json
{
    "status": "success",
    "message": "Trip deleted successfully"
}
```

## Error Handling

### Error Response Format
```json
{
    "status": "error",
    "error": {
        "code": "string",
        "message": "string",
        "details": "object (optional)"
    }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| 400  | Bad Request - Invalid input parameters |
| 401  | Unauthorized - Authentication required |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource doesn't exist |
| 422  | Unprocessable Entity - Validation failed |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error |

## Rate Limiting

- Rate limit: 100 requests per minute per IP
- Rate limit headers included in response:
  ```http
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 99
  X-RateLimit-Reset: 1635739200
  ```

## Versioning

- Current version: v1
- Version is specified in the URL path
- Breaking changes will result in a new version

## Best Practices

1. Always include error handling in your implementation
2. Use appropriate HTTP methods for operations
3. Include the API version in your requests
4. Store the JWT token securely
5. Implement proper request timeout handling

## Support

For API support or questions:
- Email: api-support@tripgo.com
- Documentation: https://docs.tripgo.com
- Status Page: https://status.tripgo.com

---

Last Updated: 2025-02-08
Version: 1.0.0