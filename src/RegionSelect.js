function RegionSelect({ data, regionSelect } ) {
    

    const regionData = data;
    const regionNames = regionData.map((network, index) => <option key={index} value={network.id}>{network.name}</option>);

    const handleSelect = (e) => {
        regionSelect(e)
    }

    return(
        <div>
            <label>Choose a Region:</label>
            <select onChange={handleSelect}>{regionNames}</select>
        </div>

    )
}

export default RegionSelect