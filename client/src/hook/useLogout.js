import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../redux/slice/isLoginSlice';
import { userinfoLoginOut } from '../redux/slice/userInfoSlice';
import api from '../api/api';

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = () => {
    //로그아웃 하는 api 호출
    console.log('로그아웃');
    try {
      const response = api.logoutApi();
      navigate('/');
      localStorage.clear();
      dispatch(logout());
      dispatch(userinfoLoginOut());
    } catch (error) {
      console.log(error);
      //  navigate('/error');
    }
  };
  return handlelogout;
}
