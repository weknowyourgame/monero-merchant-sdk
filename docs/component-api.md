# Component API Reference

This document provides detailed specifications for the `MoneroPaymentComponent` included in the Monero Payment SDK.

## MoneroPaymentComponent

A React component for displaying and processing Monero payments.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `gatewayUrl` | string | Yes | - | URL of the payment gateway service |
| `apiKey` | string | No | - | API key for authentication with hosted services |
| `amount` | number | Yes | - | Amount in XMR to be paid |
| `description` | string | No | - | Description of the payment/invoice |
| `refund` | string | No | - | Refund address if payment needs to be returned |
| `onPaymentComplete` | function | No | - | Callback when payment is successfully received |
| `onPaymentError` | function | No | - | Callback when an error occurs |
| `onPaymentStarted` | function | No | - | Callback when payment process begins |
| `checkInterval` | number | No | 10000 | Interval in ms to check payment status |
| `darkMode` | boolean | No | false | Enable dark-themed UI |

### Events

#### onPaymentComplete
Triggered when a payment is detected and confirmed.

```jsx
function handlePaymentComplete(id) {
  console.log(`Payment ${id} completed successfully!`);
  // Update order status, redirect user, etc.
}

<MoneroPaymentComponent
  onPaymentComplete={handlePaymentComplete}
  // ...other props
/>
```

#### onPaymentError
Triggered when an error occurs during the payment process.

```jsx
function handlePaymentError(error) {
  console.error('Payment error:', error.message);
  // Display error message, offer retry, etc.
}

<MoneroPaymentComponent
  onPaymentError={handlePaymentError}
  // ...other props
/>
```

#### onPaymentStarted
Triggered when an invoice is successfully created.

```jsx
function handlePaymentStarted(id, address) {
  console.log(`Payment ${id} started. Address: ${address}`);
  // Log the payment start, update UI, etc.
}

<MoneroPaymentComponent
  onPaymentStarted={handlePaymentStarted}
  // ...other props
/>
```

### Example Usage with Hosted Service

```jsx
import React from 'react';
import { MoneroPaymentComponent } from 'monero-payment-sdk';

export default function CheckoutPage() {
  return (
    <div className="checkout-container">
      <h1>Complete Your Purchase</h1>
      
      <MoneroPaymentComponent
        gatewayUrl="https://pay.whiskypeak.com" 
        apiKey="your-api-key-here"
        amount={0.025}
        description="Premium Plan - 1 Month"
        onPaymentComplete={(id) => {
          // Redirect to success page
          window.location.href = `/success?orderId=${id}`;
        }}
        darkMode={true}
      />
    </div>
  );
}
``` 