import classes from './Post.module.css';
import UserImg from '../../../ui/UserImg';
import Reactions from './Reactions';
import MoreButton from '../../../ui/MoreButton';
const Post = ({ name, username, time, text, image }) => {
  return (
    <article className={classes.post}>
      <div className={classes.content}>
        <div className={classes['user-image']}>
          <UserImg
            src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            alt='user image'
          />
        </div>
        <div className={classes.main}>
          <div className={classes.publisher}>
            <div>
              <span className={classes.name}>
                {name}
                Ahmed ayman
              </span>
              <span className={classes.username}>
                {username}
                @ahmedAyman
              </span>
              <span className={classes.dot}>.</span>
              <span className={classes['puplish-time']}>
                {time}
                3h
              </span>
            </div>
            <div>
              <MoreButton className={classes.more} />
            </div>
          </div>
          <div className={classes['post-content']}>
            <p className={classes['post-text']}>
              {/* Writing in the post */}
              {text}
            </p>

            {/* <div className={classes['post-image']}>
              <img
                src={
                  true
                    ? 'https://wallpaperaccess.com/full/1131206.jpg'
                    : { image }
                }
                alt='post image'
              />
            </div> */}
          </div>
        </div>
      </div>
      <div className={classes.reactions}>
        <Reactions />
      </div>
    </article>
  );
};
export default Post;
