"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { MoneroPayment } from './MoneroPayment';

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
export const MoneroPaymentComponent: React.FC<MoneroPaymentComponentProps> = ({
  gatewayUrl,
  apiKey,
  amount,
  description,
  refund,
  onPaymentComplete,
  onPaymentError,
  onPaymentStarted,
  checkInterval = 10000,
  darkMode = false,
}) => {
  const [paymentId, setPaymentId] = useState<string>('');
  const [paymentAddress, setPaymentAddress] = useState<string>('');
  const [status, setStatus] = useState<string>('initializing');
  const [error, setError] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  // Initialize Monero payment client with useMemo
  const moneroClient = useMemo(() => 
    new MoneroPayment({ gatewayUrl, apiKey }), 
    [gatewayUrl, apiKey]
  );

  useEffect(() => {
    // Create a new invoice when the component mounts
    createInvoice();

    // Clean up intervals when component unmounts
    return () => {
      // This will be used to clean up any intervals
    };
  }, []);

  const createInvoice = async () => {
    try {
      setStatus('creating');
      
      const { id, address } = await moneroClient.createInvoice({
        amount,
        description,
        refund,
      });
      
      setPaymentId(id);
      setPaymentAddress(address);
      setStatus('pending');
      
      if (onPaymentStarted) {
        onPaymentStarted(id, address);
      }
      
      // Start checking for payment
      startPaymentCheck(id);
    } catch (err) {
      setStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      
      if (onPaymentError && err instanceof Error) {
        onPaymentError(err);
      }
    }
  };

  const startPaymentCheck = (id: string) => {
    // Initial check
    checkPayment(id);
    
    // Set up interval to check payment status
    const intervalId = setInterval(() => {
      checkPayment(id);
    }, checkInterval);
    
    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  };

  const checkPayment = async (id: string) => {
    try {
      const info = await moneroClient.checkInvoice(id);
      
      // Update status
      setStatus(info.status.toLowerCase());
      
      // Calculate time remaining if we have an expiry date
      if (info.expiry) {
        const expiry = new Date(info.expiry);
        setExpiryDate(expiry);
        const remaining = Math.max(0, Math.floor((expiry.getTime() - Date.now()) / 1000));
        setTimeRemaining(remaining);
        
        // If expired, stop checking
        if (info.status === 'Expired') {
          // Could add retry logic here
        }
      }
      
      // If payment received, notify callback and stop checking
      if (info.status === 'Received') {
        if (onPaymentComplete) {
          onPaymentComplete(id);
        }
      }
    } catch (err) {
      setStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      
      if (onPaymentError && err instanceof Error) {
        onPaymentError(err);
      }
    }
  };

  const formatTimeRemaining = () => {
    if (timeRemaining <= 0) return '00:00';
    
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Copy address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentAddress);
  };

  // Styling based on dark mode
  const containerStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
    color: darkMode ? '#ffffff' : '#333333',
  };

  const addressStyle: React.CSSProperties = {
    padding: '10px',
    backgroundColor: darkMode ? '#444' : '#f5f5f5',
    borderRadius: '4px',
    wordBreak: 'break-all',
    marginBottom: '15px',
    border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
    fontSize: '14px',
  };

  const statusIndicatorStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginRight: '8px',
    backgroundColor: 
      status === 'received' ? '#4CAF50' : 
      status === 'confirming' ? '#FFC107' : 
      status === 'pending' ? '#2196F3' : 
      status === 'expired' ? '#9E9E9E' : '#F44336',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: darkMode ? '#444' : '#f0f0f0',
    color: darkMode ? '#fff' : '#333',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'block',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Monero Payment</h2>
      
      {status === 'error' ? (
        <div style={{ color: '#F44336', marginBottom: '15px' }}>
          <p>Error: {error}</p>
          <button 
            style={buttonStyle} 
            onClick={createInvoice}
          >
            Retry Payment
          </button>
        </div>
      ) : status === 'initializing' || status === 'creating' ? (
        <div style={{ textAlign: 'center' }}>
          <p>Initializing payment...</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={statusIndicatorStyle}></span>
              <span>Status: {status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </div>
            
            {expiryDate && (
              <div style={{ fontSize: '14px', marginBottom: '10px' }}>
                Time remaining: {formatTimeRemaining()}
              </div>
            )}

            <p style={{ marginBottom: '5px' }}>Amount: {amount} XMR</p>
            
            {description && (
              <p style={{ marginBottom: '5px' }}>Description: {description}</p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Pay to this address:
            </label>
            <div style={addressStyle}>{paymentAddress}</div>
            
            <button 
              style={buttonStyle} 
              onClick={copyToClipboard}
            >
              Copy Address
            </button>
          </div>

          {status !== 'received' && (
            <p style={{ fontSize: '14px', marginTop: '20px', textAlign: 'center' }}>
              Payment will be automatically detected. Please do not close this window.
            </p>
          )}
        </>
      )}
    </div>
  );
}; 