import React from "react";
import styled from "styled-components";
import Day from "./Day";

const AppWrapper = styled.div`
    font-family: 'Helvetica', sans-serif;
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
    padding-left: 30px;
    padding-right: 30px;
`
const SearchForm = styled.form`
    margin-bottom: 60px;
    text-align: center;
`
const SearchLabel = styled.label`
    color: #999;
    display: block;
    font-size: 12px;
    line-height: 1em;
    margin-bottom: 0.5em;
    text-transform: uppercase;
`
const SearchInput = styled.input`
    background-color: #fafafa;
    border: none;
    font-size: 30px;
    line-height: 1em;
    padding: 0.5em 1em;
`
const SearchSubmit = styled.button`
    background-color: #2cc3d4;
    background: linear-gradient( 20deg, #10c6da, #0c6e79 );
    color: #fff;
    cursor: pointer;
    font-size: 30px;
    line-height: 1em;
    padding: 0.5em 1em;

`
const Row = styled.div`
    display: flex;
    margin-left: -20px;
    margin-top: -20px;
    overflow: scroll visible;
    padding-bottom: 3px;
    
    @media (min-width: 1200px){
        justify-content: center;
    }
`
const Col = styled.div`
    padding-left: 20px;
    padding-top: 20px;
`

const highestVal = (a, b) => (a > b) ? a : b;
const lowestVal = (a, b) => (a < b) ? a : b;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: "Spring",
            zip: 77389,
            zipInput: 77389
        };
    }

    getForcast() {
        // https://api.openweathermap.org/data/2.5/forecast?zip=&appid=
        const appId = 'fc6674a674b8367069ab28ae956fec06';
        const weatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?zip=' + this.state.zip + '&appid=' + appId + '&units=imperial';

        fetch(weatherAPI)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(json => {


                let newList = [];
                let curDate;
                for (let i = 0; i < json.list.length; i++) {
                    let thisDate = new Date(json.list[i].dt * 1000).getDate();
                    const thisHigh = json.list[i].main.temp_max;
                    const thisLow = json.list[i].main.temp_min;

                    if (thisDate === curDate) {
                        const lastIdx = newList.length - 1;
                        const curHigh = newList[lastIdx].high;
                        const curLow = newList[lastIdx].low;
                        newList[lastIdx].high = highestVal(thisHigh, curHigh);
                        newList[lastIdx].low = lowestVal(thisLow, curLow);
                    } else {
                        curDate = thisDate;
                        newList.push({
                            id: json.list[i].dt,
                            high: json.list[i].main.temp_max,
                            low: json.list[i].main.temp_min,
                            description: json.list[i].weather[0].description,
                            conditionId: json.list[i].weather[0].id
                        });
                    }
                }

                this.setState({ items: newList });
                this.setState({ city: json.city.name });
            })
            .catch(function (error) {
                console.log(error);
            })
            ;
    }

    componentDidMount() {
        this.getForcast();
    }

    inputChange(event) {
        const isValid = RegExp(/^[0-9]{5}$/).test(event.target.value)
        if (isValid) {
            this.setState({ zipInput: event.target.value });
        }
    }

    updateZip(event) {
        event.preventDefault();
        this.setState({ items: null });
        this.setState({ zip: this.state.zipInput }, () => { this.getForcast(); });;
    }

    render() {

        const Days = () => {
            const isWeatherLoaded = this.state.items;
            if (isWeatherLoaded) {
                return this.state.items.map(item =>
                    <Col key={item.id}>
                        <Day
                            key={item.id}
                            datetime={new Date(item.id * 1000)}
                            description={item.description}
                            conditionId={item.conditionId}
                            high={item.high}
                            low={item.low}
                        />
                    </Col>
                );
            } else {
                return 'Loading';
            }
        }

        return (
            <AppWrapper>
                <h2>Weather ({this.state.city})</h2>
                <SearchForm onSubmit={this.updateZip.bind(this)}>
                    <SearchLabel>Zip Code</SearchLabel>
                    <SearchInput type="text" pattern="[0-9]{5}" defaultValue={this.state.zipInput} onChange={this.inputChange.bind(this)} />
                    <SearchSubmit type="submit">Go</SearchSubmit>
                </SearchForm>
                <Row>
                    <Days />
                </Row>
            </AppWrapper>
        )
    }
}
export default App;
