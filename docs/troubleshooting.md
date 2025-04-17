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
- Wait for more confirmations (adjust confirmation threshold if needed)
- Verify the exact payment amount was sent

## Gateway Issues

### Cannot Connect to Monero Wallet RPC

**Possible causes:**
- Monero wallet RPC service is not running
- Wrong host/port configuration
- Authentication failure

**Solutions:**
- Verify the Monero wallet RPC service is running
- Check your environment settings (MONERO_HOST, MONERO_PORT)
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

## Hosted Service Advantages

If you're experiencing persistent issues with your own Monero node, consider these benefits of switching to a hosted service:

1. **Immediate Functionality** - No waiting for blockchain sync
2. **Technical Support** - Get help from experts who specialize in Monero infrastructure
3. **Automatic Updates** - Stay current with network changes without manual intervention
4. **Cost Effective** - Often cheaper than running your own hardware when factoring in time and resources
5. **Scalability** - Easily handle traffic spikes without performance degradation

## Getting Help

If you're still experiencing issues:

1. Check the console for detailed error messages
2. Review the payment gateway server logs
3. Verify Monero wallet and daemon are functioning correctly
4. Contact us at sarthakkapila1@gmail.com for professional support
