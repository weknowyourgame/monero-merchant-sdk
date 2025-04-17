# Troubleshooting

Common issues and solutions for the Monero Payment SDK.

## Common Problems with Self-Hosted Nodes

### Synchronization Issues
**Problem:** 
Initial blockchain sync can take days to complete, and the wallet cannot function properly until sync is complete.

**Solution:**
- Use a hosted RPC service to avoid the sync time completely
- If you must use your own node, start with a pruned blockchain
- Consider downloading a bootstrap file to speed up initial sync

### High Resource Usage
**Problem:**
Running a full Monero node requires:
- 75+ GB of disk space (and growing)
- Significant RAM and CPU during sync
- Constant network bandwidth

**Solution:**
- Use a hosted service to avoid hardware requirements
- If self-hosting, ensure server has adequate resources (4GB+ RAM, SSD storage)
- Consider using a dedicated server instead of shared hosting

### Security Vulnerabilities
**Problem:**
Self-hosting exposes your server to potential attacks if not properly secured.

**Solution:**
- Use a professional hosted service with security expertise
- If self-hosting, never expose RPC ports directly to the internet
- Set up proper firewall rules and use a VPN for remote access

### Reliability & Uptime
**Problem:**
Node may crash or become unresponsive during high demand or after updates.

**Solution:**
- Use a hosted service with guaranteed uptime SLA
- If self-hosting, implement monitoring and auto-restart scripts
- Set up alerts for node failures

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