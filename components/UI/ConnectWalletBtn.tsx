import { Button, SxProps } from '@mui/material';
import { useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

interface Props {
  styles?: SxProps
  variant?: 'text' | 'outlined' | 'contained'
}

export function ConnectWalletBtn({ styles, variant }: Props) {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  return (
    <Button
      variant={variant ? variant : 'outlined'}
      onClick={() => connect()}
      sx={styles}
    >
      Connect Wallet
    </Button>
  )
}
