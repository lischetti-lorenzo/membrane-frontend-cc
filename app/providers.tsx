'use client'

import { ThemeProvider, createTheme } from '@mui/material';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { goerli, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const { chains, publicClient } = configureChains([goerli, sepolia], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'Membrane FE Challenge',
  projectId: '4021417780c23f8c1024a7b452b02152',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const queryClient = new QueryClient();

export function Providers({ children } : { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}
