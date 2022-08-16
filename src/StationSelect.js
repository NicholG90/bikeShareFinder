import Select from 'react-select'

function StationSelect({ data, stationSelect }) {

    const stationData = data.stations;
    const stationNames = stationData.map((station) => ({ value: `${station.id}`, label: `${station.name}` }));

    const handleSelect = (selected) => {
        stationSelect(selected.value)
    }

    return (
        <div className='stationAndRegionSelect'>
            <label>Choose a Station:</label>
            <Select onChange={handleSelect} options={stationNames} />
        </div>

    )
}

export default StationSelect