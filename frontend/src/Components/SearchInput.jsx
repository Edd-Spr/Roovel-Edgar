import '../Styles/SearchInput.css'

const SearchInput = ({ size = 20, setBarChatOpen }) => {
    
    return (
        <>
            <div className={`searchInputContainer ${size > 5 && 'searchInputContainerOpen'}`}>
                <input 
                    type="text" 
                    className='searchInput' 
                    onFocus={() => setBarChatOpen(true)} 
                />
            </div>
        </>
    );
};

export default SearchInput;