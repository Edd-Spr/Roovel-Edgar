import '../Styles/SearchInput.css'

const SearchInput = ({size=20}) =>{
    
    return (
        <>
            <div className={`searchInputContainer ${size > 5 && 'searchInputContainerOpen'}`}>
                <input type="text" name="" id="" className='searchInput'/>
            </div>
        </>
    );
}

export default SearchInput;