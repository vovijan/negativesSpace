import {SubmitHandler, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {userLogin} from "../store/userActions";
import {useAppDispatch, useAppSelector} from "../store/store";
import {Button} from "@mui/material";

type FormValues = {
  username: string,
  password: string
}

const Login = () => {
  const { loading, userInfo, error } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const { register, handleSubmit } = useForm<FormValues>()

  const navigate = useNavigate()

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate('/profile')
    }
  }, [navigate, userInfo])

  const submitForm: SubmitHandler<FormValues> = data => dispatch(userLogin(data))

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && (
        <div style={{ color: '#f23838', textAlign: 'center', margin: '0.5rem 0' }}>
          {error}
        </div>
      )}
      <div>
        <label htmlFor='username'>Имя пользователя</label>
        <input
          type='text'
          {...register('username')}
          required
        />
      </div>
      <div>
        <label htmlFor='password'>Пароль</label>
        <input
          type='password'
          {...register('password')}
          required
        />
      </div>
      <Button type='submit' disabled={loading} onClick={handleSubmit(submitForm)}>
        {'Вход'}
      </Button>
    </form>
  )
}

export default Login