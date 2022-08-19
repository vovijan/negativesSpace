import {Container} from "@mui/material";
import { Routes, Route } from 'react-router-dom'

import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UnauthorizedRoute from "./router/UnauthorizedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <Container maxWidth={'sm'}>
      <Header />
      <Routes>
        <Route path={'/'} element={
          <h1>{'Добро пожаловать!'}</h1>
        } />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route element={<UnauthorizedRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>

    </Container>
  );
}

export default App;
