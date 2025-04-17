# JavaScript API Reference

The Monero Payment SDK provides a JavaScript API for direct integration with your backend systems.

## MoneroPayment Class

The `MoneroPayment` class provides methods for creating and managing Monero payment invoices without using the React component.

### Importing

```javascript
import { MoneroPayment } from 'monero-payment-sdk';
```

### Constructor

```javascript
const moneroPayment = new MoneroPayment({
  gatewayUrl: 'https://pay.whiskypeak.com',
  apiKey: 'your-api-key-here'
});
```

#### Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `gatewayUrl` | string | Yes | URL of the payment gateway service |
| `apiKey` | string | No | API key for authentication with the service |

### Methods

#### createInvoice(options)

Creates a new Monero payment invoice.

```javascript
const { id, address } = await moneroPayment.createInvoice({
  amount: 0.025,
  description: 'Premium subscription',
  refund: 'your-refund-address'
});

console.log(`Payment ID: ${id}`);
console.log(`Payment Address: ${address}`);
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | number | Yes | Amount in XMR |
| `description` | string | No | Description of the payment |
| `refund` | string | No | Refund address if needed |

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique invoice ID |
| `address` | string | Monero payment address |

#### checkInvoice(id)

Checks the status of an existing invoice.

```javascript
const invoiceInfo = await moneroPayment.checkInvoice('abc123xyz456');
console.log(`Status: ${invoiceInfo.status}`);
console.log(`Amount: ${invoiceInfo.amount}`);
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | The invoice ID to check |

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `status` | string | Payment status ('Pending', 'Confirming', 'Received', 'Expired') |
| `amount` | string | Invoice amount in XMR |
| `address` | string | Payment address |
| `refund` | string | Refund address if provided |
| `expiry` | string | Expiry timestamp |
| `description` | string | Invoice description if provided |

#### isPaymentComplete(id)

Checks if a payment has been completed.

```javascript
const isComplete = await moneroPayment.isPaymentComplete('abc123xyz456');
if (isComplete) {
  console.log('Payment has been received!');
} else {
  console.log('Payment is still pending');
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | The invoice ID to check |

**Returns:**

`boolean` - `true` if payment is complete, `false` otherwise

#### waitForPayment(id, timeoutMs, checkIntervalMs)

Waits for a payment to complete with a timeout.

```javascript
try {
  await moneroPayment.waitForPayment('abc123xyz456', 15 * 60 * 1000, 5000);
  console.log('Payment received!');
  // Process completed payment
} catch (error) {
  console.error('Payment timeout or error:', error.message);
  // Handle timeout or error
}
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | Yes | - | The invoice ID to check |
| `timeoutMs` | number | No | 30 * 60 * 1000 | Timeout in milliseconds (default: 30 minutes) |
| `checkIntervalMs` | number | No | 10 * 1000 | Check interval in milliseconds (default: 10 seconds) |

**Returns:**

`Promise<void>` - Resolves when payment is complete, rejects on timeout or error

## Integration with Hosted Services

### WhiskyPeak Payment Service

For the simplest integration, use our hosted payment service:

```javascript
const moneroPayment = new MoneroPayment({
  gatewayUrl: 'https://pay.whiskypeak.com',
  apiKey: 'your-api-key-from-whiskypeak'
});
```

Contact sarthakkapila1@gmail.com to get API credentials.

### Custom Hosted Service

If using another hosted service, use their gateway URL:

```javascript
const moneroPayment = new MoneroPayment({
  gatewayUrl: 'https://your-selected-provider.url',
  apiKey: 'your-api-key'
});
```

## Example: Complete Payment Processing

```javascript
const { MoneroPayment } = require('monero-payment-sdk');

async function processOrder(order) {
  // Initialize with hosted service
  const moneroPayment = new MoneroPayment({
    gatewayUrl: 'https://pay.whiskypeak.com',
    apiKey: 'your-api-key-here'
  });
  
  try {
    // Create invoice
    const { id, address } = await moneroPayment.createInvoice({
      amount: order.total,
      description: `Order #${order.id}`
    });
    
    // Save invoice ID to order
    order.paymentId = id;
    order.paymentAddress = address;
    await order.save();
    
    // Return payment details to customer
    return { paymentId: id, paymentAddress: address };
  } catch (error) {
    console.error('Error creating payment:', error);
    throw new Error('Unable to process payment at this time');
  }
}

// Check if payment is complete
async function checkOrderPayment(orderId) {
  const order = await getOrder(orderId);
  
  const moneroPayment = new MoneroPayment({
    gatewayUrl: 'https://pay.whiskypeak.com',
    apiKey: 'your-api-key-here'
  });
  
  const isComplete = await moneroPayment.isPaymentComplete(order.paymentId);
  
  if (isComplete) {
    order.status = 'paid';
    await order.save();
  }
  
  return isComplete;
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