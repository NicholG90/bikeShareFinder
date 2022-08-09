function StationSelect({ data, stationSelect } ) {

    const stationData = data.stations;
    const stationNames = stationData.map((station) => <option key={station.id} value={station.id}>{station.name}</option>);

    const handleSelect = (e) => {
        stationSelect(e)
    }

    return(
        <div>
            <label>Choose a Station:</label>
            <select onChange={handleSelect}>{stationNames}</select>
        </div>

    )
}

export default StationSelect