import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import PostAvatar from '../Posts/PostAvatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0',
      margin: '0',
      backgroundColor: theme.palette.background.default,
      width: '100%',
      height: '100%',
    },
    container: {
      display: 'grid',
      gridTemplateAreas: '1fr',
      textAlign: 'center',
      justifyItems: 'center',
      alignItems: 'start',
      width: '100%',
      height: '70vh',
      [theme.breakpoints.down(1024)]: {
        height: '65vh',
      },
      [theme.breakpoints.down(600)]: {
        height: '100%',
      },
    },
    titlePage: {
      fontSize: '2.6em',
      alignSelf: 'start',
      [theme.breakpoints.down(1024)]: {
        fontSize: '2.4em',
      },
      [theme.breakpoints.down(600)]: {
        fontSize: '2.1em',
      },
    },
    infoContainer: {
      display: 'grid',
      gridTemplateColumns: '60% 40%',
      textAlign: 'center',
      justifyItems: 'center',
      alignItems: 'center',
      width: '50%',
      [theme.breakpoints.down(1200)]: {
        width: '60%',
      },
      [theme.breakpoints.down(1024)]: {
        width: '70%',
      },
      [theme.breakpoints.down(900)]: {
        width: '85%',
      },
      [theme.breakpoints.down(600)]: {
        gridTemplateColumns: '1fr',
      },
    },
    inputsContainer: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '80% 20%',
      '& .MuiFormHelperText-root': {
        fontSize: '1.3em',
        [theme.breakpoints.down(600)]: {
          fontSize: '1.1em',
        },
      },
    },
    button: {
      height: '45%',
      width: '80%',
      alignSelf: 'center',
      background: theme.palette.text.secondary,
      color: theme.palette.secondary.main,
      marginLeft: '5%',
      marginBottom: '1em',
      '&:hover': {
        color: 'black',
      },
      [theme.breakpoints.down(600)]: {
        // height: '40%',
        width: '70%',
      },
    },
    avatarPreview: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      textAlign: 'center',
      justifyItems: 'center',
      alignItems: 'center',
      justifySelf: 'end',
      padding: '5%',
      border: '1px solid rgba(71, 71, 71, 0.5)',
      borderRadius: '5px',
      [theme.breakpoints.down(600)]: {
        justifySelf: 'center',
        padding: '2%',
        margin: '10%',
      },
    },
    username: {
      fontSize: '1.8em',
      [theme.breakpoints.down(600)]: {
        fontSize: '1.6em',
      },
    },
    inputs: {
      margin: '1em 0',
    },
    formInput: {
      marginTop: '.2em',
      fontSize: '1.5em',
      [theme.breakpoints.down(600)]: {
        fontSize: '1.3em',
      },
    },
    formInputLabel: {
      fontSize: '2em',
      [theme.breakpoints.down(600)]: {
        fontSize: '1.5em',
      },
    },
    displayNameInfo: {
      textAlign: 'start',
      gridColumnStart: '1',
      gridColumnEnd: '3',
      fontSize: '1.3em',
      [theme.breakpoints.down(600)]: {
        fontSize: '1.1em',
      },
    },
    formControlLabel: {
      fontSize: '1.6em',
      height: '21px',
      [theme.breakpoints.down(900)]: {
        fontSize: '1.5em',
      },
      [theme.breakpoints.down(600)]: {
        fontSize: '1.3em',
      },
    },
    checkboxAndText: {
      margin: '5px',
    },
  })
);

type GetGitHubProps = {
  handleChange: any;
  userInfo: any;
  agreement: boolean;
};

const GetGitHub = ({ handleChange, agreement, userInfo }: GetGitHubProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1 className={classes.titlePage}>GitHub Account</h1>

        <div className={classes.infoContainer}>
          <div className={classes.inputsContainer}>
            <TextField
              fullWidth
              id="standard-basic"
              label="GitHub Username"
              helperText="Verify your GitHub account"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.formInput,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.formInputLabel,
                },
              }}
            />

            <Button className={classes.button}>Validate Git</Button>
            <TextField
              fullWidth
              id="standard-basic"
              label="Display Name"
              helperText="Choose your Telescope username"
              name="displayName"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.formInput,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.formInputLabel,
                },
              }}
            />
            <Button className={classes.button}>Validate Name</Button>

            <p className={classes.displayNameInfo}>
              * Your display name will be displayed in all of your posts and interactions with other
              users inside Telescope’s ecosystem.{' '}
            </p>
          </div>

          <div className={classes.avatarPreview}>
            <h1>Avatar Preview</h1>
            <PostAvatar name={userInfo.displayName} blog="test" />
            <h2 className={classes.username}>{userInfo.displayName}</h2>
          </div>
        </div>
        <FormControl required component="fieldset">
          <FormGroup>
            <FormControlLabel
              className={classes.checkboxAndText}
              control={
                <Checkbox
                  checked={agreement}
                  name="githubOwnership"
                  onChange={(e) => handleChange(e)}
                />
              }
              label={
                <h1 className={classes.formControlLabel}>
                  I declare that I’m the owner and the maintainer of this GitHub account
                </h1>
              }
            />
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default GetGitHub;
