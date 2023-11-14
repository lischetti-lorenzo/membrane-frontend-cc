'use client'
import { useEffect, useState } from 'react';
import { NavBar } from '../components/UI/NavBar'
import { Login } from '../components/Login';
import { Box } from '@mui/material';
import { useAccount, useNetwork } from 'wagmi';
import { VerifyWallet } from '../components/VerifyWallet';
import { Survey } from '../components/Survey';
import { SurveyContext } from '../contexts/SurveyContext';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { isConnected, isConnecting } = useAccount();
  const { chain } = useNetwork()
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0)
  const [ timeIsUp, setTimeIsUp ] = useState(false);
  const [ answersIds, setAnswersIds ] = useState<number[]>([]);
  const [ currentAnswerId, setCurrentAnswerId ] = useState<string| null>(null);

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
            <Box sx={{
              width: '100%',
              minHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
              flex: 'auto',
              justifyContent: 'center'
            }}>
              <VerifyWallet chainName={chain?.name} />
            </Box>
          ) : (
            <>
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
                <Survey />
              </SurveyContext.Provider>
            </>
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
