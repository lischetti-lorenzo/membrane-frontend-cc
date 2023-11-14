import { Button, SxProps } from '@mui/material'

interface Props {
  styles?: SxProps
  variant?: 'text' | 'outlined' | 'contained'
  text: string
  onClick: () => void
}

export function PrimaryButton({
  styles,
  variant,
  text,
  onClick
}: Props) {
  return (
    <Button
      variant={variant ? variant : 'outlined'}
      onClick={() => onClick()}
      sx={{
        ":hover": {
          backgroundColor: 'orange'
        },
        fontSize: '18px',
        backgroundColor: 'orange',
        color: 'black',
        width: '250px',
        m: 'auto',
        mt: 2,
        ...styles
      }}
    >
      {text}
    </Button>
  )
}