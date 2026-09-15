# Sales API Design

## 1. Overview

This document defines a REST API for managing customers, products, sales orders, and payments.

The API is designed for a NestJS backend using MikroORM and MongoDB.

---

## 2. Core Resources

```text
Customer
   |
   +--- Sales Order
          |
          +--- Sales Order Items
          |      +--- Product
          |      +--- Quantity
          |      +--- Unit Price
          |      +--- Discount
          |
          +--- Payments
```

Main resources:

- Customer
- Product
- Sale
- Sale Item
- Payment

---

## 3. Base URL

```text
/api/v1
```

---

## 4. Customer APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/customers` | Create customer |
| GET | `/customers` | List customers |
| GET | `/customers/:id` | Get customer |
| PATCH | `/customers/:id` | Update customer |
| DELETE | `/customers/:id` | Delete/deactivate customer |

### Create Customer

`POST /api/v1/customers`

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "address": "Rajkot, Gujarat, India"
}
```

---

## 5. Product APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/products` | Create product |
| GET | `/products` | List products |
| GET | `/products/:id` | Get product |
| PATCH | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete/deactivate product |

### Create Product

`POST /api/v1/products`

Request:

```json
{
  "name": "Laptop",
  "sku": "LAP-001",
  "price": 50000,
  "stock": 20
}
```

---

## 6. Sales APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/sales` | Create sale |
| GET | `/sales` | List sales |
| GET | `/sales/:id` | Get sale |
| PATCH | `/sales/:id` | Update sale |
| POST | `/sales/:id/cancel` | Cancel sale |
| GET | `/sales/:id/invoice` | Get invoice |

---

## 7. Create Sale

`POST /api/v1/sales`

### Request

```json
{
  "customerId": "cus_123",
  "items": [
    {
      "productId": "prod_101",
      "quantity": 2,
      "unitPrice": 1500,
      "discount": 100
    },
    {
      "productId": "prod_102",
      "quantity": 1,
      "unitPrice": 500,
      "discount": 0
    }
  ],
  "tax": 342,
  "notes": "Regular customer"
}
```

### Server-side Calculation

Never trust totals sent by the client. Calculate them on the server.

```text
itemSubtotal = quantity * unitPrice
itemTotal    = itemSubtotal - discount

subtotal     = sum(itemTotal)
tax          = calculated/applied tax
grandTotal   = subtotal + tax
paidAmount   = sum(successful payments)
dueAmount    = grandTotal - paidAmount
```

### Response

```json
{
  "id": "sale_789",
  "invoiceNumber": "INV-2026-000789",
  "customerId": "cus_123",
  "status": "CONFIRMED",
  "subtotal": 3400,
  "tax": 342,
  "grandTotal": 3742,
  "paidAmount": 0,
  "dueAmount": 3742,
  "currency": "INR",
  "items": [
    {
      "productId": "prod_101",
      "quantity": 2,
      "unitPrice": 1500,
      "discount": 100,
      "total": 2900
    },
    {
      "productId": "prod_102",
      "quantity": 1,
      "unitPrice": 500,
      "discount": 0,
      "total": 500
    }
  ],
  "createdAt": "2026-09-14T10:30:00Z",
  "updatedAt": "2026-09-14T10:30:00Z"
}
```

---

## 8. Sale Statuses

```text
DRAFT
  |
  v
CONFIRMED
  |
  +----> PARTIALLY_PAID ----> PAID
  |
  +----> CANCELLED
```

Available statuses:

```text
DRAFT
CONFIRMED
PARTIALLY_PAID
PAID
CANCELLED
REFUNDED
```

### Status Rules

- `DRAFT` can be edited.
- `CONFIRMED` represents a finalized sale.
- `PARTIALLY_PAID` means some but not all money has been received.
- `PAID` means the full amount has been received.
- `CANCELLED` means the sale is no longer valid.
- `REFUNDED` means money was returned after payment.

---

## 9. Payment APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/sales/:id/payments` | Record payment |
| GET | `/sales/:id/payments` | List sale payments |
| GET | `/payments/:id` | Get payment |
| POST | `/payments/:id/refund` | Refund payment |

### Record Payment

`POST /api/v1/sales/sale_789/payments`

Request:

```json
{
  "amount": 2000,
  "method": "UPI",
  "reference": "UPI-123456"
}
```

Response:

```json
{
  "id": "pay_001",
  "saleId": "sale_789",
  "amount": 2000,
  "method": "UPI",
  "reference": "UPI-123456",
  "status": "SUCCESS",
  "createdAt": "2026-09-14T10:35:00Z"
}
```

---

## 10. Business Rules

The backend must validate:

```text
quantity > 0
unitPrice >= 0
discount >= 0
discount <= quantity * unitPrice
payment amount > 0
payment amount <= remaining due
```

Additional rules:

- A cancelled sale cannot receive a payment.
- A fully paid sale should not be edited without an explicit adjustment flow.
- A payment must belong to an existing sale.
- A product must exist before it can be added to a sale.
- Stock should be checked before confirming a sale.
- Totals must always be recalculated by the server.
- Monetary values should use a safe decimal/money representation rather than floating-point arithmetic where possible.

---

## 11. MongoDB Collections

Recommended collections:

```text
customers
products
sales
payments
```

### Sale Document

```json
{
  "_id": "sale_789",
  "invoiceNumber": "INV-2026-000789",
  "customerId": "cus_123",
  "items": [
    {
      "productId": "prod_101",
      "quantity": 2,
      "unitPrice": 1500,
      "discount": 100,
      "total": 2900
    }
  ],
  "subtotal": 2900,
  "tax": 290,
  "grandTotal": 3190,
  "paidAmount": 2000,
  "dueAmount": 1190,
  "status": "PARTIALLY_PAID",
  "createdAt": "2026-09-14T10:30:00Z",
  "updatedAt": "2026-09-14T10:35:00Z"
}
```

---

## 12. NestJS Project Structure

```text
src/
├── sales/
│   ├── sales.controller.ts
│   ├── sales.service.ts
│   ├── sales.module.ts
│   ├── entities/
│   │   └── sale.entity.ts
│   └── dto/
│       ├── create-sale.dto.ts
│       ├── update-sale.dto.ts
│       └── create-payment.dto.ts
│
├── customers/
│   ├── customers.controller.ts
│   ├── customers.service.ts
│   └── entities/
│       └── customer.entity.ts
│
├── products/
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── entities/
│       └── product.entity.ts
│
└── payments/
    ├── payments.controller.ts
    ├── payments.service.ts
    └── entities/
        └── payment.entity.ts
```

---

## 13. Request Flow

```text
HTTP Request
     |
     v
Controller
     |
     v
DTO Validation
     |
     v
Sales Service
     |
     +--> Validate Customer
     |
     +--> Validate Products
     |
     +--> Validate Stock
     |
     +--> Calculate Totals
     |
     +--> Create Sale
     |
     +--> Update Stock
     |
     v
MikroORM
     |
     v
MongoDB
```

---

## 14. List Sales

`GET /api/v1/sales`

Recommended query parameters:

```text
?page=1
&limit=20
&status=PAID
&customerId=cus_123
&from=2026-09-01
&to=2026-09-14
&search=INV-2026
```

Example:

```text
GET /api/v1/sales?page=1&limit=20&status=PAID
```

Response:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "totalPages": 0
  }
}
```

---

## 15. Error Response Format

Use one consistent format across the API.

```json
{
  "statusCode": 400,
  "code": "SALE_INVALID_PAYMENT",
  "message": "Payment amount exceeds the remaining balance",
  "timestamp": "2026-09-14T10:40:00Z",
  "path": "/api/v1/sales/sale_789/payments"
}
```

Common error codes:

```text
CUSTOMER_NOT_FOUND
PRODUCT_NOT_FOUND
SALE_NOT_FOUND
SALE_INVALID_STATUS
SALE_INVALID_PAYMENT
INSUFFICIENT_STOCK
INVALID_AMOUNT
VALIDATION_ERROR
```

---

## 16. Authentication and Authorization

For production, protect the API with authentication.

```text
Authorization: Bearer <token>
```

Suggested roles:

```text
ADMIN
MANAGER
SALES_USER
ACCOUNTANT
```

Example permissions:

```text
ADMIN       -> everything
MANAGER     -> sales + products + customers + reports
SALES_USER  -> create/read sales + customers
ACCOUNTANT  -> payments + invoices + sales read
```

---

## 17. Important Production Features

After the basic CRUD API works, add:

- Inventory reservation and stock deduction.
- Refunds.
- Invoice numbering.
- Tax configuration (for example GST rules where applicable).
- Audit logs.
- Idempotency keys for sale/payment creation.
- Pagination and filtering.
- Role-based authorization.
- Input validation.
- Consistent error handling.
- API documentation with Swagger/OpenAPI.
- Automated unit and integration tests.

---

## 18. Recommended Build Order

Build the project in this order:

```text
1. Customer module
2. Product module
3. Sale entity + Sale Item
4. Create Sale API
5. Server-side total calculation
6. Sale listing/details
7. Payment module
8. Payment status updates
9. Inventory integration
10. Cancellation/refund
11. Authentication/authorization
12. Tests + Swagger
```

This keeps the first version simple while leaving room for inventory, payments, refunds, and reporting later.
