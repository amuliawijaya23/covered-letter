import { useState } from 'react';
import { Box, Grid, Card, CardHeader, CardActions, CardContent, Button, TextField, Divider } from '@mui/material';

// import custom hook
import useUserData from '../../hooks/useUserData';

// modes variables
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';

const Login = () => {
  const { signInWithGoogle, signOutUser } = useUserData();
  const [ mode, setMode ] = useState(LOGIN);

  const modeHandler = () => {
    mode === LOGIN ? setMode(REGISTER) : setMode(LOGIN);
  };

  return (
    <Box sx={{ display: 'flex', height: '90vh', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ width: '400' }}>
        <CardHeader title={'COVERED LETTER'} titleTypographyProps={{ align: 'center', variant: 'h6', sx: { fontFamily: 'monospace', letterSpacing: '0.3rem', fontSize: '2rem' } }} />
        <CardActions>
          <Grid container padding={1} justifyContent='center'>
            <Grid item container width='50%'>
              <Grid item xs={6}>
                <Button 
                  fullWidth 
                  variant={mode === LOGIN ? 'contained' : 'outlined'}
                  onClick={modeHandler}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  fullWidth 
                  variant={mode === REGISTER ? 'contained' : 'outlined'}
                  onClick={modeHandler}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
        <CardContent>
          <Grid container spacing={1} padding={1}>
            <Grid item xs={12}>
              <TextField label='Email' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label='Password' fullWidth />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Button variant='outlined' fullWidth>Login</Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider>
          OR
        </Divider>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth onClick={signInWithGoogle}>Sign in with Google</Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth>Sign in with Microsoft</Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth>Sign in with Github</Button>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>

        </CardContent>
      </Card>
    </Box>
  )
}

export default Login