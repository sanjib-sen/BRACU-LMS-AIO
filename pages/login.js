
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Body from '../components/container'

const useStyle = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const login = () => {
    const classes = useStyle();
  
    const {handleSubmit, control} = useForm({
      defaultValues: {
        email:"",
        password: ""
      }
    });
  
    const onSubmit = async (values) => {
        localStorage.setItem('user', values.email);
        localStorage.setItem('pass', values.password);
    }
    return (
      <Body>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
  
                <Controller
                  control={control}
                  name="email"
                  render={({field}) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      // id="email"
                      label="Email Address"
                      // name="email"
                      // autoComplete="email"
                      // autoFocus
                    />
                  )}
                />
  
                <Controller
                  control={control}
                  name="password"
                  render={({field}) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      // id="password"
                      label="Password"
                      type='password'
                      // name="password"
                      // autoComplete="current-password"
                      // autoFocus
                    />
                  )}
                />
  
              {/* <FormControlLabel control={<Checkbox value="remember" color="primary"/>} label="Remember Me"/> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
  
            <Grid item>
            </Grid>
  
          </div>
      </Body>
      );
  };
  
  export default login;