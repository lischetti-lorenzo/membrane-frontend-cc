'use client'

import { ThemeProvider, createTheme } from '@mui/material';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { goerli, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { SurveyContext } from '../contexts/SurveyContext';

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
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0)
  const [ timeIsUp, setTimeIsUp ] = useState(false);
  const [ answersIds, setAnswersIds ] = useState<number[]>([]);
  const [ currentAnswerId, setCurrentAnswerId ] = useState<string| null>(null);

  return (
    <ThemeProvider theme={darkTheme}>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <SurveyContext.Provider value={{
            currentQuestionIndex,
            setCurrentQuestionIndex,
            timeIsUp,
            setTimeIsUp,
            answersIds,
            setAnswersIds,
            currentAnswerId,
            setCurrentAnswerId
          }}>
            {children}
          </SurveyContext.Provider>
        </QueryClientProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}
