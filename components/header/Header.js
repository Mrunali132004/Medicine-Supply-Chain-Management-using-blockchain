import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  userDisplay: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    marginRight: theme.spacing(1),
  }
}));

function Header() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.isLoggedIn) {
      setCurrentUser(user);
    }
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    handleClose();
    
    // Simply redirect using window.location
    window.location.href = '/';
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" style={{ background: 'black' }}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>Medicare</Typography>
            
            {currentUser ? (
              <div className={classes.userDisplay}>
                <Typography className={classes.userName}>
                  Welcome, {currentUser.firstName}
                </Typography>
                <Button 
                  color="inherit"
                  onClick={handleMenuClick}
                >
                  Account
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button href="/signin" color="inherit">Login</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
      {/* <Cards /> */}
    </div>
  );
}

export default Header;