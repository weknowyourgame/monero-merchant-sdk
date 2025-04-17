# Monero Payment SDK

A JavaScript SDK for easily integrating Monero (XMR) payments into web applications.

## Features

- **React Component**: Ready-to-use payment UI component
- **JavaScript API**: Programmatic access for custom implementations
- **Flexible Integration**: Works with hosted or self-managed payment gateways
- **Dark Mode Support**: UI adapts to light/dark themes
- **Responsive Design**: Works on mobile and desktop

## Installation

```bash
npm install monero-payment-sdk
# or
yarn add monero-payment-sdk
```

## Quick Start

### 1. Import the Component

```jsx
import { MoneroPaymentComponent } from 'monero-payment-sdk';
```

### 2. Add it to Your App

```jsx
function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      <MoneroPaymentComponent 
        gatewayUrl="https://pay.whiskypeak.com"
        apiKey="your-api-key" 
        amount={0.025}
        description="Premium Plan - 1 Month"
        onPaymentComplete={(id) => {
          console.log(`Payment complete: ${id}`);
          // Handle successful payment
        }}
      />
    </div>
  );
}
```

## Using Hosted Services

For the fastest integration, use a hosted Monero payment service:

1. **Sign up** for a WhiskyPeak payment gateway account by contacting sarthakkapila1@gmail.com
2. **Get API credentials** for your account
3. **Integrate** using the gatewayUrl and apiKey provided

```jsx
<MoneroPaymentComponent 
  gatewayUrl="https://pay.whiskypeak.com"
  apiKey="your-api-key-from-whiskypeak" 
  amount={0.025}
  description="Premium Plan"
/>
```

## Documentation

- [Getting Started](./docs/getting-started.md)
- [Component API](./docs/component-api.md)
- [JavaScript API](./docs/js-api.md)
- [Troubleshooting](./docs/troubleshooting.md)

## Advantages of Monero for Payments

- **Privacy**: Transactions are private by default
- **Low Fees**: Much lower fees than credit card processors
- **No Chargebacks**: Eliminates fraud risk for merchants
- **Global Access**: Accept payments from anywhere in the world
- **Fast Settlements**: Transactions confirm quickly

## Need Help?

Contact Sarthak Kapila at sarthakkapila1@gmail.com for:
- Custom integration assistance
- Hosted payment gateway access
- Enterprise support options

## License

ISC License