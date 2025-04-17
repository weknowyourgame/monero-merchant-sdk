import React from 'react';
interface MoneroPaymentComponentProps {
    gatewayUrl: string;
    apiKey?: string;
    amount: number;
    description?: string;
    refund?: string;
    onPaymentComplete?: (id: string) => void;
    onPaymentError?: (error: Error) => void;
    onPaymentStarted?: (id: string, address: string) => void;
    checkInterval?: number;
    darkMode?: boolean;
}
/**
 * React component for handling Monero payments
 */
export declare const MoneroPaymentComponent: React.FC<MoneroPaymentComponentProps>;
export {};
