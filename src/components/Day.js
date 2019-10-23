import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

const Card = styled.div`
    background-color: #fcfcfc;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border-radius: 5px;
    min-width: 150px;
    padding: 30px;
    text-align: center;
`;
const CardIcon = styled.img`
    height: auto;
    margin-top: -30px;
    width: 100px;
`
const CardTitle = styled.h3`
    color: #2cc3d4;
    font-size: 20px;
    font-weight: 300;
    line-height: 1em;
    letter-spacing: 0.1em;
    margin: 0 0 0.25em 0;
    text-transform: uppercase;
`
const Description = styled.p`
    color: #999;
    font-wdight: 300;
    margin: 0 0 2em 0;
    text-transform: capitalize;
`;
const Temps = styled.p`
    display: flex;
    font-size: 40px;
    justify-content: space-evenly;
    margin: 0;
`
const High = styled.span`
    font-weight: 400;
`
const Low = styled.span`
    color: #aaa;
    font-weight: 300;
`

// const toStandardTime = militaryTime => {
//     if (militaryTime === 12) return '12 PM';
//     if (militaryTime >= 12) return (militaryTime - 12) + ' PM';
//     return militaryTime + ' AM';
// }

const getDayOfWeek = a => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][a];

const iconCodes = {
    "code200": "thunder", // thunderstorm with light rain
    "code201": "thunder", // thunderstorm with rain
    "code202": "thunder", // thunderstorm with heavy rain
    "code210": "thunder", // light thunderstorm
    "code211": "thunder", // thunderstorm
    "code212": "thunder", // heavy thunderstorm
    "code221": "thunder", // ragged thunderstorm
    "code230": "thunder", // thunderstorm with light drizzle
    "code231": "thunder", // thunderstorm with drizzle
    "code232": "thunder", // thunderstorm with heavy drizzle
    "code300": "rainy-6", // light intensity drizzle
    "code301": "rainy-6", // drizzle
    "code302": "rainy-6", // heavy intensity drizzle
    "code310": "rainy-6", // light intensity drizzle rain
    "code311": "rainy-6", // drizzle rain
    "code312": "rainy-6", // heavy intensity drizzle rain
    "code313": "rainy-6", // shower rain and drizzle
    "code314": "rainy-6", // heavy shower rain and drizzle
    "code321": "rainy-6", // shower drizzle
    "code500": "rainy-4", // light rain
    "code501": "rainy-5", // moderate rain
    "code502": "rainy-5", // heavy intensity rain
    "code503": "rainy-6", // very heavy rain
    "code504": "rainy-6", // extreme rain
    "code511": "rainy-6", // freezing rain
    "code520": "rainy-6", // light intensity shower rain
    "code521": "rainy-6", // shower rain
    "code522": "rainy-6", // heavy intensity shower rain
    "code531": "rainy-6", // ragged shower rain
    "code600": "snowy-6", // light snow
    "code601": "snowy-6", // Snow
    "code602": "snowy-6", // Heavy snow
    "code611": "snowy-6", // Sleet
    "code612": "snowy-6", // Light shower sleet
    "code613": "snowy-6", // Shower sleet
    "code615": "snowy-6", // Light rain and snow
    "code616": "snowy-6", // Rain and snow
    "code620": "snowy-6", // Light shower snow
    "code621": "snowy-6", // Shower snow
    "code622": "snowy-6", // Heavy shower snow
    "code701": "", // mist
    "code711": "", // Smoke
    "code721": "", // Haze
    "code731": "", // sand/ dust whirls
    "code741": "", // fog
    "code751": "", // sand
    "code761": "", // dust
    "code762": "", // volcanic ash
    "code771": "", // squalls
    "code781": "", // tornado
    "code800": "day", // clear sky
    "code801": "cloudy-day-1", // few clouds: 11-25%
    "code802": "cloudy-day-1", // scattered clouds: 25-50%
    "code803": "cloudy-day-1", // broken clouds: 51-84%
    "code804": "cloudy-day-1", // overcast clouds: 85-100%
};

const Day = props => {
    const dayOfWeek = getDayOfWeek(props.datetime.getDay());
    // const hour = toStandardTime(props.datetime.getHours());
    const icon = iconCodes[`code${props.conditionId}`];
    const tempHigh = parseInt(props.high);
    const tempLow = parseInt(props.low);
    return (
        <Card>
            <CardIcon src={require(`./icons/${icon}.svg`)} />
            <CardTitle>{dayOfWeek}</CardTitle>
            {/* <p>{hour}</p> */}
            <Description>{props.description}</Description>
            <Temps>
                <High>{tempHigh}&deg;</High>
                <Low>{tempLow}&deg;</Low>
            </Temps>
        </Card>
    )
}

Day.propTypes = {
    high: PropTypes.number.isRequired,
    low: PropTypes.number.isRequired,
    datetime: PropTypes.instanceOf(Date).isRequired
};

export default Day;