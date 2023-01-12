import { useCallback, useEffect, useState } from 'react';
import classes from './Feed.module.css';
import Post from './post/Post';
import Tweeting from './tweeting/Tweeting';

//  fun. CHANGING THE ORDER OF THE POSTS UI...
const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const getPostsIntoFeed = useCallback(async () => {
    // Here i want to dynamiclly render data when fetching ...
    const response = await fetch(
      'https://twetter-17f8f-default-rtdb.firebaseio.com/post.json'
    );
    if (!response.ok) {
      throw new Error('getting data failed');
    }
    const fetchedData = await response.json();
    let postsArray = [];
    for (const key in fetchedData) {
      postsArray.push({
        id: key,
        text: fetchedData[key],
      });
    }
    setPosts(postsArray);
  }, [setPosts]);

  posts.sort((quoteA, quoteB) => {
    return quoteA.id < quoteB.id ? 1 : -1;
  });
  useEffect(() => {
    getPostsIntoFeed();
  }, [getPostsIntoFeed]); // again infinite loop problemmmm
  return (
    <section className={`middle ${classes.feed}`}>
      <div className={classes['head-control']}>
        <div className={classes['feed-header']}>
          <h4>Home</h4>
        </div>
      </div>
      <div className={classes['feed-control']}>
        <Tweeting />
        <div className={classes.posts}>
          {posts.map((post) => (
            <Post text={post.text} key={post.id} />
          ))}
        </div>
        {/* <div>
        <span>Home</span>
      </div>
      <div>
        <UserImg />
      </div>
      <div>
        <div></div>
        <div></div>
      </div> */}
      </div>
    </section>
  );
};

export default Feed;
