import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useState, SyntheticEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import useAuth from '../hooks/use-auth';
import Overview from '../components/SignUp/Overview';
import DisplayName from '../components/SignUp/DisplayName';
import GetGitHub from '../components/SignUp/GetGitHub';
import GetBlogRSS from '../components/SignUp/GetBlogRSS';
import Review from '../components/SignUp/Review';
import DynamicImage from '../components/DynamicImage';

type UserInfo = {
  id?: string;
  isAdmin?: boolean;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  feeds?: string[];
  github?: {
    username: string;
    avatarUrl: string;
  };
  blogOwnership: boolean;
  githubOwnership: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0',
      margin: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100vw',
      boxSizing: 'border-box',
      position: 'relative',
    },
    imageContainer: {
      minHeight: '100vh',
      width: '100vw',
      position: 'absolute',
      top: '0',
      bottom: '0',
      zIndex: -1,
      [theme.breakpoints.down(600)]: {
        display: 'none',
      },
    },
    signUpContainer: {
      margin: '1% 0 1% 0',
      display: 'grid',
      gridTemplateRows: '10% auto 13%',
      gridGap: '2%',
      justifyItems: 'center',
      fontFamily: 'Spartan',
      height: '420px',
      width: '510px',
      padding: '1%',
      borderRadius: '5px',
      boxShadow: '2px 4px 4px 1px rgba(0, 0, 0, 0.1)',
      background: '#ECF5FE',
      '@media (max-height: 500px) and (max-width: 1024px)': {
        margin: '0 0 65px 0',
      },
      [theme.breakpoints.down(600)]: {
        background: 'none',
        boxShadow: 'none',
        minHeight: '650px',
        height: '600px',
        position: 'absolute',
        top: '0px',
        width: '100%',
        margin: '0',
        padding: '0',
        gridTemplateRows: '8% auto 17%',
      },
    },
    title: {
      color: '#121D59',
      fontSize: '22px',
    },
    infoContainer: {
      width: '100%',
      position: 'relative',
    },
    formContainer: {},
    buttonsWrapper: {
      display: 'flex',
    },
    button: {
      fontSize: '1.1em',
      padding: '1em',
      margin: '5px 10px',
      background: '#E0C05A',
      '&:hover': {
        color: 'black',
        background: '#EBD898',
      },
    },
  })
);

const SignUpPage = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState<number>(0);
  const { user, login } = useAuth();

  if (!user) {
    login();
  }

  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: user?.id,
    isAdmin: user?.isAdmin,
    displayName: user?.name,
    blogOwnership: false,
    githubOwnership: false,
    github: {
      username: '',
      avatarUrl: '',
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name } = e.target;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    console.log(userInfo);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(userInfo);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return <Overview />;
      case 1:
        return <DisplayName />;
      case 2:
        return (
          <GetGitHub
            handleChange={handleChange}
            agreement={userInfo.githubOwnership}
            userInfo={userInfo}
          />
        );
      case 3:
        return <GetBlogRSS handleChange={handleChange} agreement={userInfo.blogOwnership} />;
      case 4:
        return <Review userInfo={userInfo} />;
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <DynamicImage />
      </div>
      <div className={classes.signUpContainer}>
        <h1 className={classes.title}>Telescope Account</h1>
        <div className={classes.infoContainer}>{renderContent()}</div>
        <div className={classes.formContainer}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className={classes.buttonsWrapper}>
              {activeStep > 0 && (
                <Button className={classes.button} onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {activeStep === 0 && (
                <Button className={classes.button} onClick={handleNext}>
                  Start
                </Button>
              )}
              {activeStep < 4 && activeStep > 0 && (
                <Button
                  className={classes.button}
                  onClick={handleNext}
                  disabled={
                    // eslint-disable-next-line no-nested-ternary
                    activeStep === 2
                      ? !userInfo.githubOwnership
                      : activeStep === 3
                      ? !userInfo.blogOwnership
                      : false
                  }
                >
                  Next
                </Button>
              )}
              {activeStep === 4 && (
                <Link href="/" passHref>
                  <Button
                    className={classes.button}
                    onClick={() => {
                      console.log(userInfo);
                    }}
                  >
                    Confirm
                  </Button>
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
