import '../Styles/SearchInput.css'

const SearchInput = ({size=20}) =>{

    return (
        <>
            <div className="searchInputContainer" style={{width: `${size}vw`}}>
                <input type="text" name="" id="" className='searchInput'/>
            </div>
        </>
    );
}

export default SearchInput;