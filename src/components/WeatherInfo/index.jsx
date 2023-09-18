import styled from 'styled-components';
export default function WeatherInfo() {
    return(
        <WheatherContainer>
            <h1>WeatherInfo</h1>
            <div>
                <h2>Agora: <span>Cidade</span></h2>
                <h3>Mínima: <span>15.9°C</span></h3>
                <h3>Máxima: <span>25.7°C</span></h3>
            </div>
            <div>
                <h3><span>Nublado</span></h3>
                <h1><span>18.2°C</span></h1>
            </div>
        </WheatherContainer>
    );
}

const WheatherContainer = styled.div`
    width: 100%;
    height: 40%;
    border-radius: 10px;
    color: #8E8E8E;
    h1 {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: white;
    margin-top: 30px;
    margin-bottom: 20px;
    }
`;