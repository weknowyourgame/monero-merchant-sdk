import axios from 'axios';

interface MoneroPaymentConfig {
  gatewayUrl: string;  // The URL of the payment gateway
  apiKey?: string;     // Optional API key for authentication
}

interface CreateInvoiceOptions {
  amount: number;      // Invoice amount in XMR
  description?: string; // Optional description
  refund?: string;     // Optional refund address
}

interface InvoiceInfo {
  status: string;      // 'Pending' | 'Confirming' | 'Received' | 'Expired'
  amount: string;      // Invoice amount in XMR
  address: string;     // Payment address
  refund?: string;     // Refund address if provided
  expiry: string;      // Expiry timestamp
  description?: string; // Invoice description if provided
}

/**
 * Monero Payment handler for creating and checking invoices
 */
export class MoneroPayment {
  private config: MoneroPaymentConfig;

  /**
   * Create a new MoneroPayment instance
   * @param config Configuration for the payment gateway
   */
  constructor(config: MoneroPaymentConfig) {
    this.config = config;
  }

  /**
   * Create a new Monero invoice
   * @param options Options for creating the invoice
   * @returns Promise with the invoice ID and payment address
   */
  async createInvoice(options: CreateInvoiceOptions): Promise<{ id: string; address: string }> {
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
      const headers: Record<string, string> = {};
      if (this.config.apiKey) {
        headers['X-Auth-Token'] = this.config.apiKey;
      }

      // Make the request
      const response = await axios.get(url.toString(), { headers });
      
      if (response.status !== 200) {
        throw new Error(`Failed to create invoice: ${response.data}`);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to create invoice: ${error.response?.data || error.message}`);
      }
      throw error;
    }
  }

  /**
   * Check the status of a Monero invoice
   * @param id Invoice ID
   * @returns Promise with the invoice information
   */
  async checkInvoice(id: string): Promise<InvoiceInfo> {
    try {
      // Validate invoice ID
      if (!id || id.length !== 16) {
        throw new Error('Invalid invoice ID');
      }

      // Build URL with query parameters
      const url = new URL('/api/monero/info', this.config.gatewayUrl);
      url.searchParams.append('id', id);

      // Set up request headers
      const headers: Record<string, string> = {};
      if (this.config.apiKey) {
        headers['X-Auth-Token'] = this.config.apiKey;
      }

      // Make the request
      const response = await axios.get(url.toString(), { headers });
      
      if (response.status !== 200) {
        throw new Error(`Failed to check invoice: ${response.data}`);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to check invoice: ${error.response?.data || error.message}`);
      }
      throw error;
    }
  }

  /**
   * Check if a payment has been completed
   * @param id Invoice ID
   * @returns Promise with payment completion status
   */
  async isPaymentComplete(id: string): Promise<boolean> {
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
  async waitForPayment(
    id: string, 
    timeoutMs = 30 * 60 * 1000, 
    checkIntervalMs = 10 * 1000
  ): Promise<void> {
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
        } catch (error) {
          reject(error);
        }
      };
      
      checkPayment();
    });
  }
} 