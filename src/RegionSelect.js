import Select from 'react-select'

function RegionSelect({ data, regionSelect } ) {
    

    const regionData = data;
    const regionNames = regionData.map((network, index) => ({ value:`${network.id}`, label:`${network.name}` }));



    const handleSelect = (selected) => {
        regionSelect(selected.value)
    }

    return(
        <div>
            <label>Choose a Region:</label>
            <Select onChange={handleSelect} options={regionNames} />
        </div>

    )
}

export default RegionSelect