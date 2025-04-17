interface MoneroPaymentConfig {
    gatewayUrl: string;
    apiKey?: string;
}
interface CreateInvoiceOptions {
    amount: number;
    description?: string;
    refund?: string;
}
interface InvoiceInfo {
    status: string;
    amount: string;
    address: string;
    refund?: string;
    expiry: string;
    description?: string;
}
/**
 * Monero Payment handler for creating and checking invoices
 */
export declare class MoneroPayment {
    private config;
    /**
     * Create a new MoneroPayment instance
     * @param config Configuration for the payment gateway
     */
    constructor(config: MoneroPaymentConfig);
    /**
     * Create a new Monero invoice
     * @param options Options for creating the invoice
     * @returns Promise with the invoice ID and payment address
     */
    createInvoice(options: CreateInvoiceOptions): Promise<{
        id: string;
        address: string;
    }>;
    /**
     * Check the status of a Monero invoice
     * @param id Invoice ID
     * @returns Promise with the invoice information
     */
    checkInvoice(id: string): Promise<InvoiceInfo>;
    /**
     * Check if a payment has been completed
     * @param id Invoice ID
     * @returns Promise with payment completion status
     */
    isPaymentComplete(id: string): Promise<boolean>;
    /**
     * Waits for a payment to complete with a timeout
     * @param id Invoice ID
     * @param timeoutMs Timeout in milliseconds (default: 30 minutes)
     * @param checkIntervalMs Check interval in milliseconds (default: 10 seconds)
     * @returns Promise that resolves when payment is complete or rejects on timeout
     */
    waitForPayment(id: string, timeoutMs?: number, checkIntervalMs?: number): Promise<void>;
}
export {};
