import "./App.css";
import React from "react";
import axios from "axios";
import WeatherParameters from "./components/weather-parameters";
import {config} from './config/config'
class App extends React.Component {

    constructor(){
        super();
        this.state={
            city: ""
        }
    }

    handleChange=(event)=>{
        this.setState({...this.state, city: event.target.value})
    }

    onsubmit = async (event) =>{
        event.preventDefault()
        let url = config.baseUrl + this.state.city
        await this.getWeatherDetails(url);
    }

    async getWeatherDetails(url) {
        try {
            const data = await axios({
                method: 'post',
                url: url,
            });
            if(data.data.cod === "404"){
                alert(data.data.message)
            } else {
                this.setState({ ...this.state, main: data.data.main });
            }
        } catch (error) {
            console.log(error);
        }
    }

  render() {
    let result = null

    if(this.state.main){
        result = Object.keys(this.state.main).map(el => {
            return (
                <WeatherParameters key={el} className ="params" title = {el} value={this.state.main[el]}/>
            )
        })
    }
    return (
      <div className="App">
        <form className="form">
          <h2>  Enter the name of a city</h2>
          <input className="bigText" type="text" value={this.state.city}
            onChange={this.handleChange} placeholder="Example: Mumbai"/>
          <br/>
          <br/>
          <button className="btn" type="submit" onClick={this.onsubmit}>Get Weather Details</button>
        </form>
        <div className="container" >
            {result}
        </div>
      </div>
    );
  }
}

export default App;
