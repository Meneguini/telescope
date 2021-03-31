import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0',
      margin: '0',
      backgroundColor: theme.palette.background.default,
      width: '100%',
    },
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: theme.palette.text.primary,
      width: '100%',
      height: '60vh',
      // background: 'black',
    },
    welcomeMessage: {
      fontSize: '1.3em',
    },
    userInfo: {
      margin: 0,
      padding: 0,
      fontSize: '1.2em',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    },
    telescopeInfo: {
      fontSize: '1.4em',
    },
    helpButtons: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    },
    button: {
      padding: '1.5em',
      background: theme.palette.text.secondary,
      color: theme.palette.secondary.main,
      fontSize: '1em',
      margin: '1em',
      '&:hover': {
        color: 'black',
      },
    },
    text: {
      fontSize: '1.5em',
    },
  })
);

const WelcomeMessage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.welcomeMessage}>
          {/* Full Name and E-mail from SSO. */}
          <h1>Hello Tiffany Wise, let’s create your Telescope Account!</h1>
          <h2>Follow the information that we already have:</h2>
        </div>
        <div className={classes.userInfo}>
          <h2>
            <b>Full Name: </b>Tiffany Wise
          </h2>
          <h2>
            <b>Email: </b>tiffanywise@myseneca.ca
          </h2>
        </div>
        <div className={classes.telescopeInfo}>
          <h2>Telescope system requires all users to have a GitHub account and a blog page.</h2>
          <h2>If you need help to create these accounts please check:</h2>
        </div>
        <div className={classes.helpButtons}>
          <Button className={classes.button}>How to create a personal blog</Button>
          <Button className={classes.button}>How to create a GitHub Account</Button>
        </div>
        <div className={classes.text}>
          <p>If you already have a GitHub account and a personal blog page click start.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
