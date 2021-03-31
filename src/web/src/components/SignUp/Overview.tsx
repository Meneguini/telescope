import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useAuth from '../../hooks/use-auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0',
      margin: '0',
      backgroundColor: theme.palette.background.default,
      width: '100%',
      minHeight: '100%',
    },
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
      textAlign: 'center',
      alignItems: 'center',
      width: '100%',
      height: '70vh',
      [theme.breakpoints.down(1024)]: {
        height: '65vh',
      },
      [theme.breakpoints.down(600)]: {
        height: '90vh',
      },
    },
    welcomeMessage: {
      fontSize: '1.3em',
      alignSelf: 'start',
      [theme.breakpoints.down(1024)]: {
        fontSize: '1.2em',
      },
    },
    userInfo: {
      color: '#292929',
      margin: 0,
      padding: '1%',
      width: '50%',
      height: '80%',
      fontSize: '1.2em',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #C5EB98',
      background: 'rgba(197, 235, 152, 0.2)',
      borderRadius: '5px',
      [theme.breakpoints.down(1200)]: {
        width: '60%',
      },
      [theme.breakpoints.down(1024)]: {
        width: '70%',
        fontSize: '1em',
      },
      [theme.breakpoints.down(900)]: {
        width: '80%',
      },
      [theme.breakpoints.down(600)]: {
        gridTemplateColumns: '1fr',
        height: '90%',
      },
    },
    userInfoLabel: {
      gridColumnStart: '1',
      gridColumnEnd: '3',
      fontSize: '1.6em',
      [theme.breakpoints.down(600)]: {
        gridColumnStart: '1',
        gridColumnEnd: '2',
      },
    },
    userInfoType: {
      color: '#525252',
    },
    telescopeInfo: {
      fontSize: '1.28em',
      textAlign: 'center',
      alignSelf: 'end',
      [theme.breakpoints.down(1200)]: {
        fontSize: '1.2em',
      },
      [theme.breakpoints.down(1024)]: {
        fontSize: '1em',
      },
      [theme.breakpoints.down(900)]: {
        marginLeft: '20px',
        marginRight: '20px',
      },
    },
    helpButtons: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    },
    button: {
      padding: '0 0.5em',
      background: theme.palette.text.secondary,
      color: theme.palette.secondary.main,
      borderRadius: '50px',
      fontSize: '1em',
      margin: '0 0.5em 0em 1em',
      '&:hover': {
        color: 'black',
      },
      height: '60px',
      [theme.breakpoints.down(1200)]: {
        height: '50px',
      },
    },
    text: {
      fontSize: '1.4em',
      alignSelf: 'end',
      [theme.breakpoints.down(1024)]: {
        fontSize: '1.2em',
      },
    },
  })
);

const Overview = () => {
  const classes = useStyles();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.welcomeMessage}>
          <h1>Hello {user.name}</h1>
        </div>
        <div className={classes.userInfo}>
          <h2 className={classes.userInfoLabel}>Follow the information that we already have:</h2>
          <h2>
            <b>Full Name: </b>
            <span className={classes.userInfoType}>{user.name}</span>
          </h2>
          <h2>
            <b>Email: </b>
            <span className={classes.userInfoType}>{user.email}</span>
          </h2>
        </div>
        <div className={classes.telescopeInfo}>
          <h2>If you need help to create a GitHub account and a blog page please check:</h2>
        </div>
        <div className={classes.helpButtons}>
          <Button variant="outlined" className={classes.button}>
            How to create a personal blog
          </Button>
          <Button variant="outlined" className={classes.button}>
            How to create a GitHub Account
          </Button>
        </div>
        <div className={classes.text}>
          <h3>Click NEXT to continue:</h3>
        </div>
      </div>
    </div>
  );
};

export default Overview;
