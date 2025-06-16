import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "@src/hooks/useProducts";
import { useDebouncedValue } from "@src/hooks/useDebouncedValue";
import type { ProductType } from "@src/types/products";
import type { Column } from "@src/components/widgets/DataTable";

export const BRANDS = ["Rolex", "AP", "Panerai", "Breitling"];

export const useTableLogic = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const pageNumber = parseInt(searchParams.get("page_number") ?? "1");
    const selectedBrands = searchParams.getAll("brand");
    const searchQuery = searchParams.get("search") ?? "";

    const [searchInput, setSearchInput] = useState(searchQuery);
    const debouncedSearch = useDebouncedValue(searchInput, 700);
    useEffect(() => {
        const updated = new URLSearchParams();

        if (debouncedSearch.trim()) {
            updated.set("search", debouncedSearch.trim());
            setSearchParams(updated);
        }
        
        setTimeout(() => {
          !searchParams.has("brand") && setSearchParams(updated);
        }, 0)
    }, [debouncedSearch]);



    const queryParams = useMemo(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (pageNumber > 1) params.set("page_number", pageNumber.toString());
        if (!searchParams.has("search")) params.delete("search");
        selectedBrands.forEach((b) => params.append("brand", b));
        return params;
    }, [pageNumber, selectedBrands]);

    const queryString = useMemo(() => queryParams.toString(), [queryParams]);

    const { data, isLoading, error, isFetching, isFetched } = useProducts(`?${queryString}`);


    const toggleBrand = (brand: string) => {
        const updated = new URLSearchParams(searchParams.toString());
        const current = new Set(updated.getAll("brand"));

        current.has(brand) ? current.delete(brand) : current.add(brand);
        updated.delete("brand");
        [...current].forEach((b) => updated.append("brand", b));

        updated.delete("page_number");
        setSearchInput("")
        updated.delete("search");
        setSearchParams(updated);
    };


    const handlePageChange = (page: number) => {
        const updated = new URLSearchParams(searchParams.toString());
        if (page > 1) updated.set("page_number", page.toString());
        else updated.delete("page_number");
        navigate(`/table?${updated.toString()}`);
    };

    const rows = data?.results ?? [];
    const columns: Column<ProductType>[] =
        rows.length > 0
            ? Object.keys(rows[0]).map((key) => ({
                key: key as keyof ProductType,
                label: key.replace(/_/g, " ").toUpperCase(),
            }))
            : [];

    return {
        BRANDS,
        columns,
        rows,
        isLoading,
        isFetching,
        isFetched,
        error,
        pageNumber,
        selectedBrands,
        searchInput,
        setSearchInput,
        toggleBrand,
        handlePageChange,

    };
};
