import { HomeFilters, type FiltersState } from "./widgets/HomeFilters"

const Home = () => {
    const handleApplyFilters = (filters: FiltersState) => {
        console.log('Filters applied:', filters);
    };
    return (
        <>
            <HomeFilters onClick={handleApplyFilters} />
        </>
    )
}

export default Home