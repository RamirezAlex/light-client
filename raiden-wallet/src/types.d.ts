import RaidenService from '@/services/raiden-service';
import { RaidenChannels, TokenInfo } from 'raiden';

export type Tokens = { [token: string]: TokenInfo };

export interface RootState {
  loading: boolean;
  defaultAccount: string;
  accountBalance: string;
  providerDetected: boolean;
  userDenied: boolean;
  channels: RaidenChannels;
  tokens: Tokens;
}

declare global {
  interface Window {
    web3: any;
    ethereum: any;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $raiden: RaidenService;
  }
}
