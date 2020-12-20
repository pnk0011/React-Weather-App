import React, { useEffect } from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "0987e16d706704c5bb9e67e1e4d9e2f3";

class App extends React.Component {
  state = {
    city: undefined,
    country: undefined,
    main: undefined,
    quote: undefined,
    quote_author: undefined,
    error: undefined
  };

  async componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()

        .then((position) => {
          console.log({ position });
          this.getWeatherByCurrentLocation(
            position.coords.latitude,
            position.coords.longitude
          );
        })
        .catch((err) => {
          console.log({ err });
          this.getWeatherByCurrentLocation(28.67, 77.22);
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(
      () => this.getWeatherByCurrentLocation(this.state.lat, this.state.lon),
      600000
    );
    try {
      const quote_data = await fetch("https://api.quotable.io/random");

      const quote = await quote_data.json();
      this.setState({
        quote: quote.content,
        quote_author: quote.author
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  getWeatherByCurrentLocation = async (lat, lon) => {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`
    );
    const data = await api_call.json();
    this.setState({
      city: data.name,
      country: data.sys.country,
      main: data.weather[0].main,
      error: undefined
    });
  };

  getWeatherByCity = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    try {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await api_call.json();
      if (city) {
        if (data.cod === 200) {
          this.setState({
            city: data.name,
            country: data.sys.country,
            main: data.weather[0].main,
            error: undefined
          });
        } else {
          this.setState({
            city: undefined,
            country: undefined,
            main: undefined,
            error: "City not found !!"
          });
        }
      } else {
        this.setState({
          city: undefined,
          country: undefined,
          main: undefined,
          error: "Please enter city !!"
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-5 form-container">
                  <Form getWeather={this.getWeatherByCity} />
                  <Weather
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.main}
                    error={this.state.error}
                  />
                </div>
                <div className="col-md-6 col-sm-6 title-container">
                  <Titles
                    quote={this.state.quote}
                    author={this.state.quote_author}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
