# Crypto API

### This is the backend of the KoinX backend Developer Assignment

- Live Link : https://koinx-backend-two.vercel.app/
- Postman collection : https://elements.getpostman.com/redirect?entityId=28606222-263b0920-bf26-4d3e-b8e5-a1bfb4f350ec&entityType=collection


## Installation


Follow these steps to install and run the project:

1. Clone the Repository

```bash
    git clone https://github.com/Ayush-Vish/Crypto-APIs.git
```

2. Navigate into the project directory:

```bash
    cd <project-directory>
```

3. Make a .env file and copy the content of the .env.example

```bash
    cp .env.example .env
```

4. Install the dependencies:

```bash
    npm install 
```

5. Start the server:

```bash
    npm run dev 
```

## Endpoints

## 1. Get Cryptocurrency Price

### Endpoint: /price

### Method: GET

### Query Parameters

- fromCurrency: The cryptocurrency to fetch the price for.
- toCurrency: The currency to fetch the price in.
- date: The date to fetch the price for in the format MM-DD-YYYY.

### Description

This endpoint retrieves the price of a specific cryptocurrency in a specific currency for a given date.

### Sample Request (BASE_URL = http://localhost:3000/api/v1/crypto)

### The 2024 Dates are working in the free version.

```bash
    GET /price?fromCurrency=bitcoin&toCurrency=usd&date=01-01-2024
```


## 2. Get Companies Holding Cryptocurrency
### Endpoint: /companies/:currency

### Method: GET

### Path Parameter:

- currency: The cryptocurrency to fetch the companies for.
- Description:
This endpoint retrieves the list of companies holding a specific cryptocurrency.

### Sample Request:

```bash
   GET /companies/bitcoin
```