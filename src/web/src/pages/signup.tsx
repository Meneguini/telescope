import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useState, SyntheticEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import useAuth from '../hooks/use-auth';
import Overview from '../components/SignUp/Overview';
import GetGitHub from '../components/SignUp/GetGitHub';
import GetBlogRSS from '../components/SignUp/GetBlogRSS';
import Review from '../components/SignUp/Review';

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
      backgroundColor: theme.palette.background.default,
      width: '100%',
      minHeight: '100%',
      display: 'grid',
      gridTemplateRows: '13% 70% 13%',
      gridGap: '1%',
      justifyItems: 'center',
      fontFamily: 'Spartan',
      position: 'relative',
      [theme.breakpoints.down(1024)]: {
        gridTemplateRows: '10% 65% auto',
      },
      [theme.breakpoints.down(600)]: {
        gridTemplateRows: '8% 70% auto',
        height: '150vh',
        // padding: '0 2em 0 2em',
      },
    },
    title: {
      color: theme.palette.text.secondary,
      fontSize: '35px',
      [theme.breakpoints.down(1024)]: {
        fontSize: '30px',
      },
      [theme.breakpoints.down(600)]: {
        fontSize: '26px',
      },
    },
    infoContainer: {
      width: '100%',
      minHeight: '100%',
    },
    buttonFormContainer: {
      [theme.breakpoints.down(600)]: {
        // alignSelf: 'center',
      },
    },
    buttonsWrapper: {
      display: 'flex',
    },
    button: {
      fontSize: '1.3em',
      padding: '1.5em',
      margin: '5px 10px',
      background: '#E0C05A',
      [theme.breakpoints.down(1024)]: {
        width: '50%',
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
        return (
          <GetGitHub
            handleChange={handleChange}
            agreement={userInfo.githubOwnership}
            userInfo={userInfo}
          />
        );
      case 2:
        return <GetBlogRSS handleChange={handleChange} agreement={userInfo.blogOwnership} />;
      case 3:
        return <Review />;
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Telescope Account</h1>
      <div className={classes.infoContainer}>{renderContent()}</div>
      <div className={classes.buttonFormContainer}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className={classes.buttonsWrapper}>
            {activeStep > 0 && (
              <Button className={classes.button} onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {activeStep < 3 ? (
              <Button
                className={classes.button}
                onClick={handleNext}
                disabled={
                  // eslint-disable-next-line no-nested-ternary
                  activeStep === 1
                    ? !userInfo.githubOwnership
                    : activeStep === 2
                    ? !userInfo.blogOwnership
                    : false
                }
              >
                Next
              </Button>
            ) : (
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
  );
};

export default SignUpPage;
