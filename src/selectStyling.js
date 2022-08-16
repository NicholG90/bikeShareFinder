export const customStyles = {
    option: (provided, state) => ({
        ...provided,
        border: '1px dashed #E9C46A',
        color: state.isFocused ? '#E76F51' : '#264653',
        backgroundColor: state.isFocused ? "#2A9D8F" : "white",
        padding: 20,
    }),
    input: (provided) => ({
        ...provided,
        padding: '15px 0px',
    }),
    placeholder: (provided) => ({
        ...provided,
        padding: '15px 0px',
    }),
    menuPortal: (provided) => ({
        ...provided,
        borderRadius: '50px',
    }),
    control: (provided, state) => ({
        ...provided,
        borderRadius: "50px",
        border: state.isSelected ? '2px solid red' : '2px solid #2A9D8F',
        margin: '25px 0'
    })

}