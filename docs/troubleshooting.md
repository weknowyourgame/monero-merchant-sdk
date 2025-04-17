# Troubleshooting

Common issues and solutions for the Monero Payment SDK.

## Component Issues

### "Failed to create invoice: [object Object]"

**Possible causes:**
- Payment gateway is not running
- Database is not set up correctly
- Network connection issues

**Solutions:**
- Ensure your payment gateway server is running
- Check that the `monero_invoices` table exists in your database
- Verify the URL in `gatewayUrl` prop is correct and accessible

### Payment Not Being Detected

**Possible causes:**
- Monero node is not fully synchronized
- Not enough confirmations yet
- Incorrect payment amount

**Solutions:**
- Check that your Monero node is fully synced
- Wait for more confirmations (adjust `MONERO_MIN_CONFIRMATIONS` if needed)
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