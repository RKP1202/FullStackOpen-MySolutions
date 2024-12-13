// import React from 'react'
// import { useState, useEffect } from 'react'
// import countryService from './services/Countries'

// const App = () => {

//   const [searchValue, setSearchValue] = useState("")
//   const [allCountries, setAllcountries] = useState([])
//   const [filteredCountries, setFilteredCountries] = useState([])
//   const handleChange = (event) => {
//     setSearchValue(event.target.value)
//     console.log(event.target.value);
//   }

//   useEffect(() => {
//     const request = countryService
//       .getAll()
//       .then(response => {
//         setAllcountries(response.data)
//       })
//   }, [])

//   // console.log(allCountries);
//   return (
//     <>
//       <div>
//         Find Countries
//         <input type="text" value={searchValue} onChange={handleChange} />
//       </div>
//       <div>
//         <h2>Results</h2>
//         <ul>
//           {filteredCountries.map((country) => (
//             <li key={country.name.common}>{country.name.common}</li>
//           ))}
//         </ul>
//       </div>
//     </>
//   )
// }

// export default App



import React, { useState, useEffect } from 'react';
import countryService from './services/Countries';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    // Filter countries as the user types
    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
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
        ) : (
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.name.common}>{country.name.common}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default App;
