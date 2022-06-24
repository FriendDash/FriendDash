import Header from '../components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from '../components/Profile';
import { Link, useParams } from 'react-router-dom';

// Ref Dynamic Routing: https://reacttraining.com/blog/react-router-v5-1/

const ProfilePage = () => {
  let { id } = useParams();
  // get id from url
  // do fetch/get req from db for this user id
  // show user profile info and ratings

  return (
    <div>
      {/* <Header /> */}
      This is a sample of dynami routing so we can get custom profile pages
      <br />
      userid: {id}
    </div>
  );
};

export default ProfilePage;
