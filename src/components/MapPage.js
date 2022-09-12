import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import RegionSelect from './RegionSelect'
import MapSearch from './MapSearch'
import BikeAnimatedSVG from './BikeAnimatedSVG'

function MapPage() {

    const [regions, setRegions] = useState();
    const [userRegion, setUserRegion] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            url: "https://api.citybik.es/v2/networks/",
            method: "GET",
        }).then((response) => {
            setRegions(response.data.networks);
        });
        setTimeout(() => {
            setLoading(false)
        }, 750)
    }, []);

    const regionSelect = (selected) => {
        const regionID = selected
        const regionsCopy = [...regions]
        const userSelectedRegion = regionsCopy.find(selectedRegion => selectedRegion.id === regionID);
        setUserRegion(userSelectedRegion)
    }



    return (
        <div className='mainContent'>
            {!loading && regions ? <RegionSelect data={regions} regionSelect={regionSelect} /> : <BikeAnimatedSVG />}
            {userRegion ? <MapSearch data={userRegion.href} /> : null}
        </div>
    )
}

export default MapPage