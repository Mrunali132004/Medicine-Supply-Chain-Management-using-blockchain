import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import SignUp from './SignUp';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom';

const myStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find the user
    const user = users.find(user => 
      user.email === formData.email && user.password === formData.password
    );
    
    if (user) {
      // Store logged in user info
      localStorage.setItem('currentUser', JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isLoggedIn: true
      }));
      
      // Redirect to home
      props.history.push('/');
      window.location.reload(); // To update header
    } else {
      alert('Invalid email or password');
    }
  };
  
  const classes = myStyles();
  return (
    <Router>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField 
              variant="outlined" 
              margin="normal" 
              required 
              fullWidth 
              id="email" 
              label="Email Address" 
              name="email" 
              autoComplete="email"
              autoFocus 
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined" 
              margin="normal" 
              required 
              fullWidth 
              name="password" 
              label="Password" 
              type="password" 
              id="password" 
              autoComplete="current-password" 
              value={formData.password}
              onChange={handleChange}
            />
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              color="primary" 
              className={classes.submit} 
            > 
              Sign In 
            </Button>
            <Grid container>
              <Grid item>
                <NavLink exact to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Route exact path="/signup" component={SignUp} />
    </Router>
  );
};

export default withRouter(SignIn);
