import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../store/userSlice'
import './Header.css'
import {getUserDetails} from "../store/userActions";
import {RootState, useAppDispatch} from "../store/store";
import {Button} from "@mui/material";

const Header = () => {
  const { userInfo, userToken } = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails())
    }
  }, [userToken, dispatch])

  return (
    <header>
      <div className='header-status'>
        <span>
          {userInfo ? `Пользователь ${userInfo.username}` : `Вы не вошли`}
        </span>
        <div className='cta'>
          {userInfo ? (
            <Button variant={'contained'} onClick={() => dispatch(logout())}>{'Выход'}</Button>
          ) : (
            <NavLink to='/login'>
              <Button variant={'contained'}>
                {'Вход'}
              </Button>
            </NavLink>
          )}
        </div>
      </div>
      <nav className='navigation'>
        <NavLink to='/'>{'Домашняя страница'}</NavLink>
        <NavLink to='/login'>{'Вход'}</NavLink>
        <NavLink to='/register'>{'Регистраци'}</NavLink>
        <NavLink to='/profile'>{'Профиль'}</NavLink>
      </nav>
    </header>
  )
}

export default Header