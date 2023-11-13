'use client'
import { useEffect, useState } from 'react';
import { NavBar } from '../components/UI/NavBar'
import { Login } from '../components/Login';
import { Box } from '@mui/material';
import { useAccount, useNetwork } from 'wagmi';
import { VerifyWallet } from '../components/VerifyWallet';
import { Survey } from '../components/Survey';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { isConnected, isConnecting } = useAccount();
  const { chain } = useNetwork()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;


  return (
    <>
      <NavBar />
      {isConnecting ? (
        <div>Trying to connect to your Wallet...</div>
      ) : (
        isConnected ? (
          chain?.id !== 5 ? (
            <VerifyWallet chainName={chain?.name} />
          ) : (
            <Survey />
          )
        ) : (
          <Box sx={{
            width: '100%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex: 'auto',
            justifyContent: 'center'
          }}>
            <Login />
          </Box>
        )
      )}
    </>
  )
}
