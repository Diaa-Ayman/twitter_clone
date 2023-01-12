import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import UserImg from '../../../ui/UserImg';
import OuterInput from './OuterInputs';
import classes from './Tweeting.module.css';
import { MdOutlinePublic } from 'react-icons/md';
import { GoFileMedia } from 'react-icons/go';
import { BsEmojiSmile } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';
import { AiOutlineGif, AiOutlineSchedule } from 'react-icons/ai';
import { useState } from 'react';
const Tweeting = (props) => {
  const [post, setPost] = useState('');
  const validPost = post.length > 0 || post !== '';
  const changeInputHandler = (event) => {
    setPost(event.target.value);
  };

  const submitClasses = validPost
    ? classes.tweet
    : `${classes.tweet} ${classes.invalid}`;
  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!validPost) {
      return;
    }
    const fetchTweet = async () => {
      const response = await fetch(
        'https://twetter-17f8f-default-rtdb.firebaseio.com/post.json',
        {
          method: 'POST',
          body: JSON.stringify(post),
        }
      );

      if (!response.ok) {
        throw new Error('sending Data failed');
      }
    };
    fetchTweet();
    setPost('');
  };
  return (
    <section className={classes.tweeting}>
      <div className={classes.styling}>
        <div>
          <UserImg
            src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            alt='my-image'
          />
        </div>
        <form className={classes['input-form']} onSubmit={submitFormHandler}>
          <div className={classes['tweeting-input']}>
            <Input
              onChange={changeInputHandler}
              value={post}
              input={{
                type: 'text',
                placeholder: "What's happening?",
              }}
            />
            {false && (
              <button>
                <MdOutlinePublic />
                <span>Everyone can reply</span>
              </button>
            )}
          </div>
          <div></div>
          <footer className={classes['tweeting-submit']}>
            <div className={classes.outerInputs}>
              <OuterInput
                type='file'
                id='media'
                icon={GoFileMedia}
                for='media'
              />
              <OuterInput icon={BsEmojiSmile} />
              <OuterInput icon={BiPoll} />
              <OuterInput icon={AiOutlineGif} />
              <OuterInput icon={AiOutlineSchedule} />
            </div>
            <div>
              {' '}
              {/*  Changing background onWriting */}
              <Button className={submitClasses} type='subimt'>
                Tweet
              </Button>
            </div>
          </footer>
        </form>
      </div>
    </section>
  );
};
export default Tweeting;
