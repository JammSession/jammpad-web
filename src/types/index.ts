export * from './nuxt'

declare global {
  interface Window {
    platform?: any;
  }
}

export interface TransactionInfo {
  isOutbound: boolean;
  timeStamp: number;
  tokenSymbol: string;
  value: number
}