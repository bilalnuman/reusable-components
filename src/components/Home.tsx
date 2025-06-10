import { useEffect, useRef, useState } from "react";
import { useProducts } from "@src/hooks/useProducts";
import type { Option } from "./widgets/Select";
import Filters, { type FiltersRef } from "./widgets/HomeFilters";
import { useNavigate } from "react-router-dom";
import SearchInput, { type SearchInputRef } from "./widgets/SearchInput";

const yearOptions: Option[] = [
    { value: '2002', label: '2002' },
    { value: '2003', label: '2003' },
    { value: '2005', label: '2005' },
];

const brands: Option[] = [
    { value: 'rolex', label: 'Rolex' },
    { value: 'fitbit', label: 'Fit Bit' },
    { value: 'smartwatch', label: 'Smart Watch' },
];

const Home = () => {
    const filterRef = useRef<FiltersRef>(null);
    const searchRef = useRef<SearchInputRef>(null);
    const router = useNavigate();
    const [filterReady, setFilterReady] = useState<boolean>(false);
    const [queryFilters, setQueryFilters] = useState<string>("");
    const { data, isLoading, isError, error } = useProducts(queryFilters, filterReady);
    const handleApplyFilters = (filters) => {
        setQueryFilters(`?${filters}`);
        setFilterReady(true)
    };

    const resetFilters = () => {
        filterRef.current?.reset();
        searchRef.current?.clear();
        setQueryFilters("");
        router("/");
        setFilterReady(true)
    };

    const handleSearchChange = (value: string) => {
        const newFilter = value ? `?${value}` : '';
        if (newFilter !== queryFilters) {
            setQueryFilters(newFilter);
        }
    };

    useEffect(() => {
        const params = window.location.search;
        setQueryFilters(params);
        setFilterReady(true)
        setTimeout(()=>{
             setFilterReady(false)
        },300)
    }, [])
    console.log(data)
    return (
        <>
            <SearchInput
                onChange={handleSearchChange}
                paramName="brand"
                ref={searchRef}
            />
            <Filters
                ref={filterRef}
                brands={brands}
                options={yearOptions}
                onApply={handleApplyFilters}
            />

            <button onClick={resetFilters} className="mt-4 px-4 py-2 bg-red-500 text-white">
                Reset {JSON.stringify(filterReady)}
            </button>

            {isLoading && !filterReady && <div>Loading...</div>}
            {isError && <div>Error: {error.message}</div>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </>
    );
};
export default Home
