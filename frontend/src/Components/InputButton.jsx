import '../Styles/InputButton.css'

const InputButton = ({ valueInput, setValueInput, options, radius, height }) => {

    function handleValueChange(event) {
        setValueInput(event.target.selectedIndex);
    }
    return (
        <div className="inputButtonContainer" style={{borderRadius: radius, height: height}}>
            <select 
                value={valueInput} 
                onChange={handleValueChange} 
                className={`${valueInput > 0 && 'activeButton'} buttonStyle`}>
                {options.map((value, index) => (
                    <option key={index} value={index} className='optionStyle'>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default InputButton;