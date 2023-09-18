import styled from 'styled-components';
export default function ForecastInfo() {
    return(
        <ForecastContainer>
            <h1>ForecastInfo</h1>
        </ForecastContainer>
    );
}

const ForecastContainer = styled.div`
    width: 100%;
    height: 40%;
    h1 {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #8E8E8E;
        margin-top: 30px;
        margin-bottom: 20px;
    }
`;