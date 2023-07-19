import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../redux/slice/isLoginSlice';
import { userinfoLoginOut } from '../redux/slice/userInfoSlice';

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(logout());
    dispatch(userinfoLoginOut());
    navigate('/');
    //로그아웃 하는 api 호출
  };
  return logout;
}
