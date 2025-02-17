import '../Styles/SearchFilter.css';
import SearchInput from '../Components/SearchInput.jsx';

const SearchFilter = () =>{

    return(
        <div className="searchFilterContainer">
            <form action="" method="post">
                <SearchInput/>
                <button className="filterButton">Todas las Edades</button>
                <button className="filterButton">Todos los Generos</button>
                <button className="filterButton">PetFriendly</button>
            </form>
        </div>
    );
}

export default SearchFilter;