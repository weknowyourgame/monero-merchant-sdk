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

## Using a Remote Hosted Service

### Why Use a Hosted Service
- Avoid maintaining your own Monero node
- No need to synchronize the blockchain (which can take days)
- Faster setup time
- Professional management and uptime
- No need to handle security concerns

### Popular Monero RPC Service Providers
- GetMonero.org remote nodes
- MoneroWorld.com
- Node.Monerooutreach.org
- WhiskyPeak Payment Gateway (contact: sarthakkapila1@gmail.com)

### Setup with a Hosted RPC Service
1. **Create an Account with a Provider**
   Most services will provide:
   - Host URL
   - Port number
   - Authentication credentials

2. **Configure Your Gateway**
   Use the provided credentials in your configuration:
   ```jsx
   <MoneroPaymentComponent 
     gatewayUrl="https://your-selected-provider.com"
     apiKey="your-api-key"
     amount={0.01}
     description="Premium Subscription"
   />
   ```

## Configuration Options

| Property | Type | Description |
|----------|------|-------------|
| `gatewayUrl` | string | URL of your payment gateway |
| `apiKey` | string | Authentication key for the gateway |
| `amount` | number | Amount in XMR |
| `description` | string | Description of the payment |
| `onPaymentComplete` | function | Callback when payment is complete |
| `onPaymentError` | function | Callback when an error occurs |
| `darkMode` | boolean | Enable dark mode styling |

For complete configuration options, see the Component API documentation.

## Next Steps

- Review the API Reference for more detailed information
- See the Troubleshooting guide if you encounter issues