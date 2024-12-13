import React, { useState, useEffect } from 'react';
import countryService from './services/Countries';
import DisplayCountry from './Components/DisplayCountry';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [singleViewCountry, setSingleViewCountry] = useState(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const countriesToDisplay = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(countriesToDisplay);
    setSingleViewCountry(null)
  };

  useEffect(() => {
    countryService.getAll().then((response) => {
      setAllCountries(response.data);
      setFilteredCountries(response.data); // Initialize the filtered countries
    });
  }, []);


  return (
    <>
      <div>
        <h1>Find Countries</h1>
        <input type="text" value={searchValue} onChange={handleChange} />
      </div>
      <div>
        <h2>Results</h2>
        {filteredCountries.length > 10 && searchValue ? (
          <p>Too many matches, please narrow down your search.</p>
        )
          : filteredCountries.length === 1 && searchValue ? (
            <DisplayCountry country={filteredCountries[0]}/>
          ) 
          : singleViewCountry ? (
            <DisplayCountry country={singleViewCountry}/>
          )
            : (
              <ul>
                {filteredCountries.map((country) => (
                  <li key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => {
                      // console.log(country);
                      setSingleViewCountry(country)
                    }}>
                      Show
                    </button>
                  </li>
                ))}
              </ul>
            )}
      </div>
    </>
  );
};

export default App;
