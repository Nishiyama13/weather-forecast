import './App.css'
import styled from 'styled-components';
import { Outlet } from 'react-router-dom'
import Weather from './pages/Weather'
import Forecast from './pages/Forecast'
function App() {

  return (
    <>
      <AppContainer>
      <h1>Levo um casaquinho?</h1>
      <Outlet />
      <Weather />
      <Forecast />
      </AppContainer>
    </>
  )
}

export default App

const AppContainer = styled.div`
    width: 100vw;
    height: 100vw;;
    background-color: white;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-weight: 700;
      font-size: 25px;
      color: blue;
    }
`;