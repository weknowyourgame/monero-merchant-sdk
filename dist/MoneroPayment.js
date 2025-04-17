import axios from 'axios';
/**
 * Monero Payment handler for creating and checking invoices
 */
export class MoneroPayment {
    /**
     * Create a new MoneroPayment instance
     * @param config Configuration for the payment gateway
     */
    constructor(config) {
        this.config = config;
    }
    /**
     * Create a new Monero invoice
     * @param options Options for creating the invoice
     * @returns Promise with the invoice ID and payment address
     */
    async createInvoice(options) {
        var _a;
        try {
            const { amount, description, refund } = options;
            // Validate amount
            if (!amount || amount <= 0) {
                throw new Error('Amount must be greater than 0');
            }
            // Build URL with query parameters
            const url = new URL('/api/monero/new', this.config.gatewayUrl);
            url.searchParams.append('amount', amount.toString());
            if (description) {
                url.searchParams.append('description', description);
            }
            if (refund) {
                url.searchParams.append('refund', refund);
            }
            // Set up request headers
            const headers = {};
            if (this.config.apiKey) {
                headers['X-Auth-Token'] = this.config.apiKey;
            }
            // Make the request
            const response = await axios.get(url.toString(), { headers });
            if (response.status !== 200) {
                throw new Error(`Failed to create invoice: ${response.data}`);
            }
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to create invoice: ${((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message}`);
            }
            throw error;
        }
    }
    /**
     * Check the status of a Monero invoice
     * @param id Invoice ID
     * @returns Promise with the invoice information
     */
    async checkInvoice(id) {
        var _a;
        try {
            // Validate invoice ID
            if (!id || id.length !== 16) {
                throw new Error('Invalid invoice ID');
            }
            // Build URL with query parameters
            const url = new URL('/api/monero/info', this.config.gatewayUrl);
            url.searchParams.append('id', id);
            // Set up request headers
            const headers = {};
            if (this.config.apiKey) {
                headers['X-Auth-Token'] = this.config.apiKey;
            }
            // Make the request
            const response = await axios.get(url.toString(), { headers });
            if (response.status !== 200) {
                throw new Error(`Failed to check invoice: ${response.data}`);
            }
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to check invoice: ${((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message}`);
            }
            throw error;
        }
    }
    /**
     * Check if a payment has been completed
     * @param id Invoice ID
     * @returns Promise with payment completion status
     */
    async isPaymentComplete(id) {
        const info = await this.checkInvoice(id);
        return info.status === 'Received';
    }
    /**
     * Waits for a payment to complete with a timeout
     * @param id Invoice ID
     * @param timeoutMs Timeout in milliseconds (default: 30 minutes)
     * @param checkIntervalMs Check interval in milliseconds (default: 10 seconds)
     * @returns Promise that resolves when payment is complete or rejects on timeout
     */
    async waitForPayment(id, timeoutMs = 30 * 60 * 1000, checkIntervalMs = 10 * 1000) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            const checkPayment = async () => {
                try {
                    const isComplete = await this.isPaymentComplete(id);
                    if (isComplete) {
                        return resolve();
                    }
                    if (Date.now() - startTime > timeoutMs) {
                        return reject(new Error('Payment timeout'));
                    }
                    setTimeout(checkPayment, checkIntervalMs);
                }
                catch (error) {
                    reject(error);
                }
            };
            checkPayment();
        });
    }
}
