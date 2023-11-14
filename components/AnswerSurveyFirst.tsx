import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export function AnswerSurveyFirst() {
  const router = useRouter();
  return (
    <>
      <Box sx={{
        width: '100%',
        typography: 'body1',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography
          variant='body1'
          component='div'
          sx={{
            mr: 2,
            fontSize: '20px',
            fontFamily: 'monospace',
            fontWeight: 500,
            color: 'inherit',
            textDecoration: 'none',
            flexGrow: 1
          }}
        >
          In order to see the review, you must first answer the survey
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => router.push('/')}
          sx={{
            ":hover": {
              backgroundColor: 'orange'
            },
            fontSize: '18px',
            backgroundColor: 'orange',
            color: 'black',
            width: '250px',
            m: 'auto',
            mt: 2
          }}
        >
          Go to Survey
        </Button>
      </Box>
    </>
  )
}
