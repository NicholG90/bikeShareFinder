import Select from 'react-select'
import { customStyles } from '../helpers/selectStyling';

function RegionSelect({ data, regionSelect }) {

    const regionData = data;
    const regionNames = regionData.map((network) => ({ value: `${network.id}`, label: `${network.name} - ${network.location.city}` }));

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