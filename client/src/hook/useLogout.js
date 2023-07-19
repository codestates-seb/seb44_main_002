import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../redux/slice/isLoginSlice';
import { userinfoLoginOut } from '../redux/slice/userInfoSlice';
import api from '../api/api';

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = () => {
    localStorage.clear();
    dispatch(logout());
    dispatch(userinfoLoginOut());

    //로그아웃 하는 api 호출
    try {
      const response = api.logoutApi();
      navigate('/');
    } catch (error) {
      console.log(error);
      //  navigate('/error');
    }
  };
  return handlelogout;
}
