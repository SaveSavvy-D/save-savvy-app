import React, { useEffect, useState } from 'react';
import ProfileHeader from './ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../../store/profileSlice';
import { AppSpinner } from '../../common/AppSpinner';
import ProfileInfo from './ProfileInfo';
import ProfileCreate from './ProfileCreate';
import ProfileEdit from './ProfileEdit';

const Profile = () => {
  const { profile, status } = useSelector((state) => state.profile);
  const [showSelected, setShowSelected] = useState(true);
  const setSelection = (value) => {
    setShowSelected(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile());
  }, []);
  return (
    <div className='d-flex flex-column justify-content-center container'>
      {status === 'loading' ? (
        <AppSpinner />
      ) : !profile ? (
        <ProfileCreate />
      ) : (
        <div className='d-flex flex-column'>
          <ProfileHeader selection={setSelection} />
          <div className='bg-light-grey m-4'>
            {showSelected ? <ProfileInfo /> : <ProfileEdit />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
