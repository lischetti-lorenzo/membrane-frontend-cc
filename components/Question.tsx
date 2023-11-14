import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { IQuestion } from '../types/survey.type';
import CircularProgressWithTime from './UI/CircularProgressWithTime';
import { PrimaryButton } from './UI/PrimaryBtn';
import { useContext, useEffect } from 'react';
import { SurveyContext } from '../contexts/SurveyContext';

interface Props {
  question: IQuestion
  isLastQuestion: boolean
}

export function Question({ question, isLastQuestion }: Props) {
  const {
    timeIsUp,
    answersIds,
    setAnswersIds,
    setCurrentQuestionIndex,
    currentQuestionIndex,
    currentAnswerId,
    setCurrentAnswerId
  } = useContext(SurveyContext);

  const changeAnswer = (value: string) => {
    setCurrentAnswerId(value);
  }

  const nextQuestion = () => {
    const answerId = currentAnswerId !== null ? Number(currentAnswerId) + 1 : 0;
    setAnswersIds([...answersIds, answerId]);
    if (isLastQuestion) {
      console.log('Review: ', answersIds);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  useEffect(() => {
    setCurrentAnswerId(null);
  }, [question])

  return (
    <Box
      mt={{ xs: '5%', sm: '7%', md: '1%' }}
      alignItems='center'
      mr='auto'
      ml='auto'
      sx={{
        position: 'relative',
        width: '50%',
        minHeight: '100%',
        display: 'inline-flex',
        flexDirection: 'column',
        flex: 'auto'
      }}
    >
      <CircularProgressWithTime question={question} isEnd={isLastQuestion} />
      <Typography
        maxWidth='350px'
        maxHeight='350px'
        mt={3}
        component='img'
        src={question.image}
      />

      <Typography
        variant='body1'
        fontSize={28}
        mt={2}
      >
        {question.text}
      </Typography>

      <FormControl>
        <RadioGroup
          name="options-group"
          value={currentAnswerId}
          onChange={(event) => changeAnswer(event.target.value)}
        >
          {question.options.map((opt, index) => (
            <FormControlLabel
              key={index}
              value={index}
              control={<Radio/>}
              label={opt.text}
              disabled={timeIsUp}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <PrimaryButton
        text={isLastQuestion ? 'Review' : 'Next'}
        styles={{ width: '150px' }}
        onClick={nextQuestion}
      />
    </Box>
  )
}
