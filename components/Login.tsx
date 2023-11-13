import Box from '@mui/material/Box';
import { ConnectWalletBtn } from './UI/ConnectWalletBtn';
import { Typography } from '@mui/material';

export function Login() {
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
          Please, connect you wallet and choose the Goerli network to start using the site
        </Typography>
        <ConnectWalletBtn
          variant='contained'
          styles={{
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
        />
      </Box>
    </>
  )
}
