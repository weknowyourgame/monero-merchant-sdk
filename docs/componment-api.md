# React Component API

The `MoneroPaymentComponent` provides a complete UI for processing Monero payments.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `gatewayUrl` | string | Yes | - | URL of the payment gateway |
| `apiKey` | string | No | - | Optional API key for authentication |
| `amount` | number | Yes | - | Amount in XMR |
| `description` | string | No | - | Description of the payment |
| `refund` | string | No | - | Refund address if needed |
| `onPaymentComplete` | function | No | - | Callback when payment is complete |
| `onPaymentError` | function | No | - | Callback when an error occurs |
| `onPaymentStarted` | function | No | - | Callback when payment is started |
| `checkInterval` | number | No | 10000 | Interval to check payment status (ms) |
| `darkMode` | boolean | No | false | Whether to use dark mode styling |

## Usage Example

```jsx
import React from 'react';
import { MoneroPaymentComponent } from 'monero-payment-sdk';

function PaymentPage() {
  return (
    <div>
      <h1>Payment Page</h1>
      <MoneroPaymentComponent
        gatewayUrl="https://your-payment-gateway-url.com"
        amount={0.1}
        description="Payment for Product XYZ"
        onPaymentComplete={(id) => {
          console.log(`Payment ${id} completed!`);
          // Redirect to success page or update UI
        }}
        onPaymentError={(error) => {
          console.error('Payment error:', error);
          // Handle error
        }}
        onPaymentStarted={(id, address) => {
          console.log(`Payment ${id} started with address ${address}`);
          // Track payment initiation
        }}
        checkInterval={5000}
        darkMode={true}
      />
    </div>
  );
}

export default PaymentPage;
```

## Component States

The component handles several payment states automatically:

- **Initializing**: Initial state when component mounts
- **Creating**: When an invoice is being created
- **Pending**: When waiting for payment
- **Confirming**: When payment is detected but not fully confirmed
- **Received**: When payment is confirmed and complete
- **Expired**: When the payment window has expired
- **Error**: When an error occurs

Each state is reflected in the UI with appropriate indicators and messages.