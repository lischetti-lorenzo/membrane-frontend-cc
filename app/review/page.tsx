'use client'
import { useContext, useState } from 'react';
import { NavBar } from '../../components/UI/NavBar';
import { SurveyContext } from '../../contexts/SurveyContext';
import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { getQuiz } from '../../api/api';
import { AnswerSurveyFirst } from '../../components/AnswerSurveyFirst';
import { PrimaryButton } from '../../components/UI/PrimaryBtn';
import { writeContract, waitForTransaction } from 'wagmi/actions';
import { QUIZ_CONTRACT_ABI, QUIZ_CONTRACT_ADDRESS } from '../../constants';
import { useRouter } from 'next/navigation';

export default function Review () {
  const { data, isLoading } = useQuery({ queryKey: ['quiz'], queryFn: getQuiz });
  const { answersIds } = useContext(SurveyContext);
  const [ isLoadingTx, setIsLoadingTx ] = useState(false);
  const router = useRouter();

  const submitSurvey = async () => {
    setIsLoadingTx(true);

    try {
      const tx = await writeContract({
        address: QUIZ_CONTRACT_ADDRESS,
        abi: QUIZ_CONTRACT_ABI,
        functionName: 'submit',
        args: [1, answersIds] // Fake survey Id
      });

      await waitForTransaction(tx);
      router.push('/');
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    setIsLoadingTx(false);
  }

  return (
    <>
      <NavBar />
      {answersIds.length === 0 ? (
        <Box sx={{
          width: '100%',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 'auto',
          justifyContent: 'center'
        }}>
          <AnswerSurveyFirst />
        </Box>
      ) : (
        isLoading ? (
          <Box sx={{
            mt: 4,
            width: '100%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{
            alignItems: 'center',
            width: '100%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex: 'auto',
            justifyContent: 'center'
          }}>
            {data?.questions.map((question, i) => {
              return (
                <Box key={i+40}>
                  <Typography
                    variant='body1'
                    fontSize={28}
                    mt={2}
                    key={i}
                  >
                    {question.text}
                  </Typography>
  
                  <FormControl key={i+10}>
                    <RadioGroup
                      key={i+20}
                      name="options-group"
                      value={answersIds[i] === 0 ? null : answersIds[i] - 1}
                    >
                      {question.options.map((opt, j) => (
                        <FormControlLabel
                          key={j+30}
                          value={j}
                          control={<Radio/>}
                          label={opt.text}
                          disabled
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              )
            })}

            {isLoadingTx ? (
              <div>Loading...</div>
            ) : (
              <PrimaryButton
                text='Submit'
                onClick={submitSurvey}
                styles={{ width: '150px' }}
              />
            )}

          </Box>
        )
      )}
    </>
  )
}
