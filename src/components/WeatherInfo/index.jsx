import { useEffect, useState } from 'react';
import styled from 'styled-components';
export default function WeatherInfo() {
    
    const weatherkey = import.meta.env.VITE_API_WEATHER_KEY;
    console.log(weatherkey);
    const [city, setCity] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [temp_min, setTemp_min] = useState('');
    const [temp_max, setTemp_max] = useState('');
    const [temp, setTemp] = useState('');
    const [weather, setWeather] = useState('');
    const initianCity = "Mauá"
    const [backgroudColor, setBackgroudColor] = useState('#8E8E8E');

    useEffect(() => {
        showWeatherData(initianCity);
    },[]);

    async function searchCity(event) {
        event.preventDefault();
        showWeatherData (searchValue)
    }

    async function showWeatherData (city) {
        console.log(city);
        getWeatherData(city);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            showWeatherData (searchValue)
        }
    }

    async function getWeatherData (city) {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherkey}&lang=pt_br`
        console.log(apiWeatherURL);

        try {
            const res = await fetch(apiWeatherURL)
            const data = await res.json();
            console.log(data);
            setCity(data.name);
            setTemp_min(data.main.temp_min);
            setTemp_max(data.main.temp_max);
            setTemp(data.main.temp);
            updateWetherInfo(data.weather[0].main)
        } catch (error) {
            console.log(error.message);
        }
    }

    function updateWetherInfo(weather) {
        switch(weather) {
            case 'Clear':
                setWeather('Céu Aberto');
                setBackgroudColor('#e9e642');
                break;
            case 'Clouds':
                setWeather('Nublado');
                setBackgroudColor('grey');
                break;
            case 'Rain':
                setWeather('Chovendo');
                setBackgroudColor('blue');
                break;
            case 'Snow':
                setWeather('Nevando')
                setBackgroudColor('#c4c3bd');
                break;
            case 'Thunderstorm':
                setWeather('Tempestade');
                setBackgroudColor('#ca00d1');
                break;
            case 'Drizzle':
                setWeather('Chuviscando');
                setBackgroudColor('lightblue');
                break;
            case 'Mist':
                setWeather('Neblina');
                setBackgroudColor('lightgrey');
                break;
            default:
                setWeather('');
                setBackgroudColor('red');
                break;
        }
    }

    return(
        <>
            <InputContainer>
                <input type="text" placeholder='Digite uma cidade' id='city-input' value={searchValue} onChange={e => setSearchValue(e.target.value)} onKeyDown={handleKeyDown}/>
                <button type='button' id='search' onClick={searchCity}>Buscar</button>   
            </InputContainer>
            <WheatherContainer backgroudColor={backgroudColor}>
                <div>
                    <h3>Agora: <span id='name'>{city ? city: initianCity}</span></h3>
                    <p>Mínima: <span value={temp_min} id='temp_min'>{temp_min}</span>&deg;C</p>
                    <p>Máxima: <span value={temp_max} id='temp_max'>{temp_max}</span>&deg;C</p>
                </div>
                <CurrentTemperature>
                    <p><span>{weather}</span></p>
                    <h2><span value={temp} id='temp'>{temp}</span>&deg;C</h2>
                </CurrentTemperature>
            </WheatherContainer>
        </>
    );
}

const WheatherContainer = styled.div`
    width: 50%;
    border-radius: 10px;
    background-color: ${props => props.backgroudColor};
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    color: white;
    font-size: 14px;
    align-items: center;

    h2 {
        font-size: 30px;
        font-weight: 400;
        color: white;
        margin: auto;
    }
    
    p{
        margin-top: 0px;
        margin-bottom: 0px;
    }
`;
const CurrentTemperature = styled.div`
    p {
        margin-bottom: -10px;
        margin-right: -10px;
    }
`
const InputContainer = styled.div`
margin-bottom: 15px;


    input {
        background-color: white;
        height: 15px;
        color: black;
        border-radius: 5px;
    }
    button {
        background-color: #dbd8d8;
        height: 20px;
        color: black;
        border-radius: 5px;
    }
`