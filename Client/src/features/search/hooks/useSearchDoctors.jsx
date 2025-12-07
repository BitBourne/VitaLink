import { useContext } from 'react';
import SearchContext from '../Context/searchProvider';

const useSearchDoctors = () => {
    return useContext(SearchContext)
}

export default useSearchDoctors;