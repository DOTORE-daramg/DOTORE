import React from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { userInfoState, userInfoTypes } from '../..';

const Artist = () => {
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);

  console.log(userInfo);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Artist;
