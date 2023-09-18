import styled from 'styled-components';
import React, { useEffect, useState  } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns'

export default function ForecastInfo() {
    const weatherkey = import.meta.env.VITE_API_WEATHER_KEY;
    console.log(weatherkey);
    const [city, setCity] = useState('');
    const [forecastData, setForecastData] = useState([]);
    const initianCity = "maua"

    useEffect(() => {
        showForecastData(initianCity);
    },[]);

    async function showForecastData (city) {
        console.log(city);
        getForecastData(city);
    }

    async function getForecastData (initianCity) {
        try {
            const apiForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${initianCity}&units=metric&appid=${weatherkey}&lang=pt_br`
            console.log(apiForecastURL);
            const res = await fetch(apiForecastURL)
            const data = await res.json();
            console.log(data);

            const formatData = data.list.map(item => ({
                name: formatDay(item.dt_txt),
                temperature: item.main.temp
            }));

            setCity(data.city.name);
            setForecastData(formatData);
        } catch (error) {
            console.log(error.message);
        }
    }

    function formatDay(dt_txt) {
        const date = new Date(dt_txt);
        const options = { weekday: 'short' };
        const dayOfWeek = new Intl.DateTimeFormat('pt-BR', options).format(date);
        return `${format(date, 'dd/MM')}(${dayOfWeek})`
    }
    
    return(
        <ForecastContainer>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={forecastData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ textAnchor: 'end', interval: 0 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </ForecastContainer>
    );
}

const ForecastContainer = styled.div`
    width: 50%;
    height: 40%;
    margin-top: 40px;
    font-size: 10px;
    h1 {
        font-weight: 400;
        font-size: 15px;
        line-height: 23px;
        color: #8E8E8E;
        margin-top: 30px;
        margin-bottom: 20px;
    }
`;
