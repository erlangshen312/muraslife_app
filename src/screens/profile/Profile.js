import React, { useEffect, useState } from 'react';
import Auth from '../auth/Auth';
import { ProfileData } from './ProfileData';
import { getToken } from '../../utils/asyncStorage';

const Profile = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    getAuth();
    return () => getAuth();
  }, [isAuth]);

  const getAuth = async () => {
    const token = await getToken();
    if (token.length > 0) {
      setIsAuth(true);
    }
  };

  return !isAuth ? <Auth /> : <ProfileData />;
};

export default Profile;
