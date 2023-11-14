import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getQuiz } from '../api/api';
import { SurveyCard } from './UI/SurveyCard';
import { useContext, useState } from 'react';
import { Question } from './Question';
import { SurveyContext } from '../contexts/SurveyContext';

export function Survey() {
  const { data, isLoading } = useQuery({ queryKey: ['quiz'], queryFn: getQuiz });
  const { currentQuestionIndex, setCurrentQuestionIndex } = useContext(SurveyContext);
  const [ surveyStarted, setSurveyStarted ] = useState(false);

  const startSurvey = () => {
    setSurveyStarted(true);
    setCurrentQuestionIndex(0);
  }

  return (
    <>
      { isLoading ? (
        <CircularProgress />
      ) : (
        data ? (
          surveyStarted ? (
            <Question
              question={data.questions[currentQuestionIndex]}
              isLastQuestion={data.questions.length === currentQuestionIndex + 1}
            />
          ) : (
            <Box
              alignItems='center'
              sx={{
                width: '100%',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                flex: 'auto',
                justifyContent: 'center'
              }}
            >
              <SurveyCard data={data} onClickStart={startSurvey} />
            </Box>
          )
        ) : null
      )}
    </>
  )
}
