import classes from './SignInForm.module.css';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import { Link, useHistory } from 'react-router-dom';
import { useState, useRef } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-store';
const SignInForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // validation here

    setIsLoading(true);
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCU1Bm0nOTIevnD7P9FGUJRqV7yGeAwPw0',
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        const response = res.json();
        response.then((data) => {
          dispatch(authActions.login(data.idToken));
          history.push('/home');
          if (data && data.error && data.error.message) {
            let errMessage = data.error.message;
            alert(errMessage);
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  let submitBtn = '';

  if (isLoading) {
    submitBtn = <LoadingSpinner />;
  } else {
    submitBtn = 'Sign in';
  }

  return (
    <Card className={classes['sign-in-card']}>
      <header className={classes['sign-in-header']}>
        <Link to='/twitter'>
          <button className={classes['close-btn']}>x</button>
        </Link>
        <span className={classes['sign-in-header-logo']}>
          <Logo className={classes.logo} />
        </span>
        <span></span>
      </header>
      <form className={classes['sign-in-form']} onSubmit={submitFormHandler}>
        <div className={classes['form-container']}>
          <div className={classes['sign-in-legend']}>
            <legend>Sign in to Twitter</legend>
          </div>
          {/* <div className={classes['sign-with-apple']}>
            <Button>
              <span>
                <i className={`${classes.apple} fab fa-apple`}></i>
              </span>
              <span>Sign up with Apple</span>
            </Button>
          </div>
          <div className={classes.or}>
            <div className={classes['line']}></div>
            <div className={classes['or-span']}>
              <span>or</span>
            </div>
            <div className={classes['line']}></div>
          </div> */}
          <div className={classes['sign-in-input']}>
            <Input
              ref={emailInputRef}
              input={{
                type: 'email',
                placeholder: 'username',
              }}
              className='large-input'
            />
          </div>
          <div className={classes['sign-in-input']}>
            <Input
              ref={passwordInputRef}
              input={{
                type: 'password',
                placeholder: 'password',
              }}
              className='large-input'
            />
          </div>
          <div className={classes.submit}>
            <div className={classes['sign-in-next']}>
              <Button type='submit'>{submitBtn}</Button>
            </div>
            <div className={classes['forget-password']}>
              <Button>Forget Passowrd?</Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};
export default SignInForm;
