# Getting Started

This guide will help you quickly integrate Monero payments into your application.

## Installation

Install the SDK using npm or yarn:

```bash
npm install monero-payment-sdk
# or
yarn add monero-payment-sdk
```

## Basic Implementation

### Step 1: Import the Component

```jsx
import { MoneroPaymentComponent } from 'monero-payment-sdk';
```

### Step 2: Add the Component to Your Page

```jsx
function CheckoutPage() {
  return (
    <div>
      <h1>Complete Your Purchase</h1>
      <MoneroPaymentComponent 
        gatewayUrl="https://your-payment-gateway.com"
        amount={0.01}
        description="Premium Subscription"
        onPaymentComplete={(id) => {
          console.log(`Payment ${id} completed!`);
          // Redirect to success page
        }}
      />
    </div>
  );
}
```

## Configuration Options

| Property | Type | Description |
|----------|------|-------------|
| `gatewayUrl` | string | URL of your payment gateway |
| `amount` | number | Amount in XMR |
| `description` | string | Description of the payment |
| `onPaymentComplete` | function | Callback when payment is complete |
| `onPaymentError` | function | Callback when an error occurs |
| `darkMode` | boolean | Enable dark mode styling |

For complete configuration options, see the [Component API](./component-api.md) documentation.

## Next Steps

- [Setup Options](./setup-options.md) - Different ways to set up your Monero payment system
- [API Reference](./api-reference.md) - Complete API documentation