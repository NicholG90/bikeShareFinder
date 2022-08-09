import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RegionSelect from "./RegionSelect"
import StationSelect from "./StationSelect"
import DisplayData from "./DisplayData"

function App() {

  const [regions, setRegions] = useState();
  const [userRegion, setUserRegion] = useState();
  const [stationInformation, setStationInformation ] = useState();
  const [userStation, setUserStation] = useState();

  useEffect(() => {
    axios({
      url: "https://api.citybik.es/v2/networks/",
      method: "GET",
    }).then((response) => {
      setRegions(response.data.networks);
    });
  }, []);


  
  const regionSelect = (e) => {
    const regionID = e.target.value
    const regionsCopy = [...regions]
    const userSelectedRegion = regionsCopy.find(selectedRegion => selectedRegion.id = regionID);
    setUserRegion(userSelectedRegion)
  }



  useEffect(() => {
    if (userRegion)
    axios({
      url: `https://api.citybik.es/${userRegion.href}`,
      method: "GET",
    }).then((response) => {
      setStationInformation(response.data.network);
    });
  }, [userRegion]);

  const stationSelect = (e) => {
    const selectedStation = e.target.value
    console.log(selectedStation)
    setUserStation(stationInformation.stations.find(selectedStation => selectedStation = selectedStation));
  }




  return (
    <div className="App">
      {regions ? <RegionSelect data={regions} regionSelect={regionSelect} /> : <h2>Loading</h2>}
      {stationInformation ? <StationSelect data={stationInformation} stationSelect={stationSelect} /> : null}
      {userStation ? <DisplayData data={userStation} /> : null}
    </div>
  );
}

export default App;
