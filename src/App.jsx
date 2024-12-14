import React, { useState, useEffect } from 'react';
import Prayes from './Components/Prayes';
import './App.css';

import { BrowserRouter } from 'react-router-dom';


function App() {
  const cities = [
    { name: 'Agadir', value: 'Agadir' },
    { name: 'Casablanca', value: 'Casablanca' },
    { name: 'Rabat', value: 'Rabat' },
    { name: 'Kenitra', value: 'Kenitra' },
    { name: 'Marrakech', value: 'Marrakech' },
  ];

  const [selectedCity, setSelectedCity] = useState('Agadir');
  const [prayerTimes, setPrayerTimes] = useState({});
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=Morocco&method=2`
        );
        const data = await response.json();

        
        const adjustTime = (time, offset) => {
          const [hours, minutes] = time.split(':').map(Number);
          let adjustedMinutes = minutes + offset;
          let adjustedHours = hours;

         
          while (adjustedMinutes < 0) {
            adjustedMinutes += 60;
            adjustedHours -= 1;
          }
          while (adjustedMinutes >= 60) {
            adjustedMinutes -= 60;
            adjustedHours += 1;
          }

          
          if (adjustedHours < 0) adjustedHours += 24;
          if (adjustedHours >= 24) adjustedHours -= 24;

          return `${String(adjustedHours).padStart(2, '0')}:${String(adjustedMinutes).padStart(2, '0')}`;
        };

        
        const adjustedTimings = {
          Fajr: adjustTime(data.data.timings.Fajr, -21),        
          Sunrise: adjustTime(data.data.timings.Sunrise, -15), 
          Dhuhr: adjustTime(data.data.timings.Dhuhr, -10),     
          Asr: adjustTime(data.data.timings.Asr, -5),          
          Maghrib: adjustTime(data.data.timings.Maghrib, -5),  
          Isha: adjustTime(data.data.timings.Isha, -10),       
        };

        setPrayerTimes(adjustedTimings);
        setDate(data.data.date.readable);
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };

    fetchPrayerTimes();
  }, [selectedCity]);

  return (
    <>
    <BrowserRouter basename="/repository-name">
    
      <section>
        <div className="container">
          <div className="top_sec">
            <div className="city">
              <h3>City</h3>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="date">
              <h3>Date</h3>
              <h4>{date}</h4>
            </div>
          </div>
          <Prayes name="Fajr" time={prayerTimes.Fajr} />
          <Prayes name="Sunrise" time={prayerTimes.Sunrise} />
          <Prayes name="Dhuhr" time={prayerTimes.Dhuhr} />
          <Prayes name="Asr" time={prayerTimes.Asr} />
          <Prayes name="Maghrib" time={prayerTimes.Maghrib} />
          <Prayes name="Isha" time={prayerTimes.Isha} />
        </div>
      </section>
      </BrowserRouter>
    </>
  );
}

export default App;
