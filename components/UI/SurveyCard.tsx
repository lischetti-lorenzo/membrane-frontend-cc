import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { ISurvey } from '../../types/survey.type';

interface Props {
  data: ISurvey
  onClickStart: () => void
}

export function SurveyCard({ data, onClickStart }: Props) {
  return (
    <Card sx={{ width: { sm: '70%', md: '50%', lg: '30%', xl: '20%' } }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {data?.title}
        </Typography>
      </CardContent>
      <CardMedia
        component='img'
        image={data?.image}
        alt={data?.title}
      />
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Button
          size="medium"
          onClick={() => onClickStart()}
          sx={{
            color: 'orange',
            fontSize: '16px'
          }}              
        >
          Start
        </Button>
      </CardActions>
    </Card>
  )
}
