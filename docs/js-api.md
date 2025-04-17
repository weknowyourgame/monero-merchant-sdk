# JavaScript API Reference

The `MoneroPayment` class provides programmatic access to the Monero payment functionality.

## Constructor

```typescript
new MoneroPayment(config: MoneroPaymentConfig)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config.gatewayUrl` | string | URL of the payment gateway |
| `config.apiKey` | string | Optional API key for authentication |

## Methods

### createInvoice

```typescript
createInvoice(options: CreateInvoiceOptions): Promise<{ id: string; address: string }>
```

Creates a new Monero invoice.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options.amount` | number | Amount in XMR |
| `options.description` | string | Optional description |
| `options.refund` | string | Optional refund address |

#### Returns

A Promise resolving to an object containing:
- `id`: The invoice ID
- `address`: The Monero payment address

### checkInvoice

```typescript
checkInvoice(id: string): Promise<InvoiceInfo>
```

Checks the status of an invoice.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The invoice ID |

#### Returns

A Promise resolving to an object containing:
- `status`: Payment status ('Pending', 'Confirming', 'Received', 'Expired')
- `amount`: Invoice amount in XMR
- `address`: Payment address
- `expiry`: Expiry timestamp
- `description`: Invoice description (if provided)
- `refund`: Refund address (if provided)

### isPaymentComplete

```typescript
isPaymentComplete(id: string): Promise<boolean>
```

Checks if a payment has been completed.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The invoice ID |

#### Returns

A Promise resolving to a boolean indicating if payment is complete.

### waitForPayment

```typescript
waitForPayment(id: string, timeoutMs?: number, checkIntervalMs?: number): Promise<void>
```

Waits for a payment to complete with a timeout.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The invoice ID |
| `timeoutMs` | number | Timeout in milliseconds (default: 30 minutes) |
| `checkIntervalMs` | number | Check interval in milliseconds (default: 10 seconds) |

#### Returns

A Promise that resolves when payment is complete or rejects on timeout.

## Usage Example

```javascript
import { MoneroPayment } from 'monero-payment-sdk';

async function processPayment() {
  const moneroClient = new MoneroPayment({
    gatewayUrl: 'https://your-payment-gateway.com',
  });

  try {
    // Create an invoice
    const { id, address } = await moneroClient.createInvoice({
      amount: 0.01,
      description: 'Product purchase',
    });

    console.log(`Please pay ${amount} XMR to: ${address}`);

    // Wait for payment (with 15 minute timeout)
    await moneroClient.waitForPayment(id, 15 * 60 * 1000);
    
    console.log('Payment received!');
    // Process order fulfillment
  } catch (error) {
    console.error('Payment error:', error);
  }
}
```
```

## 6. Create a docs/mock-mode.md file:

```markdown
# Mock Mode

Mock mode allows you to develop and test your Monero payment integration without requiring a real Monero wallet or blockchain.

## When to Use Mock Mode

- During initial development
- For testing UI components and payment flow
- In CI/CD pipelines for automated testing
- When demonstrating the payment system

## How Mock Mode Works

When mock mode is enabled:

1. The payment gateway will use a mock implementation instead of connecting to a real Monero wallet
2. Address generation always returns the same placeholder address
3. Payment verification always reports successful payment after a short delay
4. All database functions still work normally

## Enabling Mock Mode

In your payment gateway's `.env` file:

```
MONERO_MOCK=true