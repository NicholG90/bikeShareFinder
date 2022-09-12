export const customStyles = {
    option: (provided, state) => ({
        ...provided,
        border: '1px dashed #66999B',
        color: state.isFocused ? '#fc9520' : '#496A81',
        backgroundColor: state.isFocused ? "#2B3A67" : "white",
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
        border: state.isSelected ? '2px solid red' : '2px solid #2B3A67',
        margin: '25px 0'
    })

}