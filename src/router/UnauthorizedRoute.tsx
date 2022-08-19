import { NavLink, Outlet } from 'react-router-dom'
import { useAppSelector } from "../store/store";
import {Button} from "@mui/material";

const UnauthorizedRoute = () => {
  const { userInfo } = useAppSelector((state) => state.user)

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className='unauthorized'>
        <h1>{'Пользователь не авторизован'} :(</h1>
        <span>
          <NavLink to='/login'>
            <Button>{'Вход'}</Button>
          </NavLink>
        </span>
      </div>
    )
  }

  return <Outlet />
}

export default UnauthorizedRoute