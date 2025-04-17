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
 Wait for more confirmations (adjust `MONERO_MIN_CONFIRMATIONS` if needed)
- Verify the exact payment amount was sent

## Gateway Issues

### Cannot Connect to Monero Wallet RPC

**Possible causes:**
- Monero wallet RPC service is not running
- Wrong host/port configuration
- Authentication failure

**Solutions:**
- Verify the Monero wallet RPC service is running
- Check your `.env` file settings (MONERO_HOST, MONERO_PORT)
- Ensure RPC username and password are correct

### Wallet RPC Returns Errors

**Possible causes:**
- Wallet file is locked or corrupted
- Monero daemon is not running
- Insufficient permissions

**Solutions:**
- Restart the wallet RPC service
- Ensure the Monero daemon (monerod) is running
- Check file permissions on the wallet file

## Database Issues

### Invoice Creation Fails

**Possible causes:**
- Database connection issues
- Table schema problems
- Missing required fields

**Solutions:**
- Verify database connection settings
- Run the migration script to ensure proper table structure
- Check for missing fields in the invoice creation request

## Development Tips

1. Start with mock mode enabled for faster development
2. Use logging to track payment process flow
3. Test with small amounts on testnet before going to production
4. Monitor both the payment gateway and Monero wallet logs

## Getting Help

If you're still experiencing issues:

1. Check the console for detailed error messages
2. Review the payment gateway server logs
3. Verify Monero wallet and daemon are functioning correctly
4. Create an issue on the GitHub repository with detailed information
```
MONERO_MOCK=true


## Testing with Mock Mode

1. Start your payment gateway with mock mode enabled
2. Create a payment through your frontend
3. The system will generate a mock Monero address
4. After a short delay, the payment will automatically be marked as "Received"

This allows you to test the entire payment flow without sending real transactions.

## User Interface

The user interface behaves exactly the same in mock mode as it does with a real Monero wallet, making it perfect for development and testing.

## Limitations

- Mock mode does not validate actual Monero transactions
- No blockchain activity is generated or monitored
- All payments are automatically marked as successful

Always test with a real Monero wallet (preferably on testnet) before deploying to production.
