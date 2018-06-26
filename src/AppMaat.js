import React, {Component} from 'react';
import axios from 'axios';
import Countries from './components/Countries';

class AppMaat extends Component {
  constructor(props) {
    super(props);
      this.state = {
        maat: [],
        countriesToShow: []
      }
    }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({
          maat: response.data,
        });
      });
  }

  filterCountries = (e) => {
    const countriesFiltered = this.state.maat
      .filter((country) => country.name.toLowerCase().startsWith(e.target.value.toLowerCase()));

    this.setState({
      countriesToShow: countriesFiltered
    });
  }
  
  render() {
    return(
      <div>
        <p>find countries <input onChange={this.filterCountries}/></p>
        <Countries countries={this.state.countriesToShow} />
      </div>
    );
  }
}

export default AppMaat;

