'use client'

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { ConnectWalletBtn } from './ConnectWalletBtn';
import { useAccount, useDisconnect } from 'wagmi';

export function NavBar() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const disconnectWallet = () => {
    handleClose()
    disconnect()
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <PsychologyAltIcon sx={{ mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            QUIZ
          </Typography>

          {isConnected ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled={true}>{address}</MenuItem>
                <MenuItem onClick={disconnectWallet}>Disconnect Wallet</MenuItem>
              </Menu>
            </div>
          ) : (
            <ConnectWalletBtn />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
