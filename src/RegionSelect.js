import Select from 'react-select'
import { customStyles } from './selectStyling';

function RegionSelect({ data, regionSelect }) {

    const regionData = data;
    const regionNames = regionData.map((network, index) => ({ value: `${network.id}`, label: `${network.name}` }));

    const handleSelect = (selected) => {
        regionSelect(selected.value)
    }

    return (
        <div className='stationAndRegionSelect'>
            <label>Choose a Region:</label>
            <Select onChange={handleSelect} options={regionNames} styles={customStyles} />
        </div>

    )
}

export default RegionSelect