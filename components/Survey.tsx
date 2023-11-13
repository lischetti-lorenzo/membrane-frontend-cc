import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getQuiz } from '../api/api';
import { SurveyCard } from './UI/SurveyCard';
import { useState } from 'react';

export function Survey() {
  const { data, isLoading } = useQuery({ queryKey: ['quiz'], queryFn: getQuiz });
  const [ surveyStarted, setSurveyStarted ] = useState(false);

  const startSurvey = () => {
    setSurveyStarted(true);
  }

  return (
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
      { isLoading ? (
        <CircularProgress />
      ) : (
        data ? (
          surveyStarted ? (
            <div>Survey Started</div>
          ) : (
            <SurveyCard data={data} onClickStart={startSurvey} />
          )
        ) : null
      )}
    </Box>
  )
}
