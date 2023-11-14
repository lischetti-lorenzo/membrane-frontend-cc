import { Box, CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { IQuestion } from '../../types/survey.type';
import { SurveyContext } from '../../contexts/SurveyContext';

// TODO: Refactor this to not depend on question object or survey context so we can use this timer anywhere
export default function CircularProgressWithTime({ question, isEnd }: { question: IQuestion, isEnd?: boolean }) {
  const [ progress, setProgress ] = useState(0);
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setTimeIsUp,
    currentAnswerId,
    setAnswersIds,
    answersIds
  } = useContext(SurveyContext);
  const [ updateSurveyContext, setUpdateSurveyContext ] = useState<number | null>(null);

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const deltaProgress = 100 / question.lifetimeSeconds;
        if (prevProgress === 100) {
          const value = updateSurveyContext !== null ? updateSurveyContext + 1 : 0;
          setUpdateSurveyContext(value);
          return 100;
        } else {
          return prevProgress + deltaProgress
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [question]);

  useEffect(() => {
    if (updateSurveyContext !== null) {
      const answerId = currentAnswerId !== null ? Number(currentAnswerId) + 1 : 0;
      setAnswersIds([...answersIds, answerId]);

      if (!isEnd) setCurrentQuestionIndex(currentQuestionIndex + 1);
      else setTimeIsUp(true);
    }
  }, [updateSurveyContext])

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" sx={{ color: 'orange', minWidth: '70px', minHeight: '70px' }} value={progress} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          fontSize='22px'
        >
          {progress / (100 / question.lifetimeSeconds)}
        </Typography>
      </Box>
    </Box>
  );
}
