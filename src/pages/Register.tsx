import { useEffect, useState } from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {registerUser} from "../store/userActions"
import {useAppDispatch, useAppSelector} from "../store/store"
import {Button} from "@mui/material";

type FormValues = {
  username: string,
  password: string,
  confirmPassword: string
}

const Register = () => {
  const [customError, setCustomError] = useState<string | null>(null)

  const { loading, userInfo, error, success } = useAppSelector(
    (state) => state.user
  )
  const dispatch = useAppDispatch()

  const { register, handleSubmit } = useForm<FormValues>()
  const navigate = useNavigate()

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/profile')
    // redirect user to login page if registration was successful
    if (success) navigate('/login')
  }, [navigate, userInfo, success])

  const submitForm: SubmitHandler<FormValues> = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError('Password mismatch')
      return
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.username = data.username.toLowerCase()

    dispatch(registerUser(data))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && (
        <div style={{ color: '#f23838', textAlign: 'center', margin: '0.5rem 0' }}>
          {error}
        </div>
      )}
      {customError && (
        <div style={{ color: '#f23838', textAlign: 'center', margin: '0.5rem 0' }}>
          {customError}
        </div>
      )}
      <div>
        <label htmlFor='username'>{'Пользователь'}</label>
        <input
          type='text'
          {...register('username')}
          required
        />
      </div>
      <div>
        <label htmlFor='password'>{'Пароль'}</label>
        <input
          type='password'
          {...register('password')}
          required
        />
      </div>
      <div>
        <label htmlFor='email'>{'Подтвердить пароль'}</label>
        <input
          type='password'
          {...register('confirmPassword')}
          required
        />
      </div>
      <Button type={'submit'} disabled={loading} onClick={handleSubmit(submitForm)}>
        {'Регистрация'}
      </Button>
    </form>
  )
}

export default Register