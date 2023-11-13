import Box from '@mui/material/Box';
import { ConnectWalletBtn } from './UI/ConnectWalletBtn';
import { Button, Typography } from '@mui/material';
import { useSwitchNetwork } from 'wagmi';

export function VerifyWallet({ chainName }: { chainName: string | undefined }) {
  const { switchNetwork } = useSwitchNetwork()
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
          You are currently using {chainName} network. Please, change the network to Goerli
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => switchNetwork?.(5)}
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
          Change to Goerli
        </Button>
      </Box>
    </>
  )
}
