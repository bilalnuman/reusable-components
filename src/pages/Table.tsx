import Spinner from "@src/components/widgets/Spinner/Spinner";
import DataTable from "@src/components/widgets/DataTable";
import type { ProductType } from "@src/types/products";
import { useTableLogic } from "@src/features/products/useTableLogic";
import { Notfound } from "@src/components/widgets";
import TextField from "@src/components/widgets/TextField";
import Checkbox from "@src/components/widgets/Checkbox";
import Button from "@src/components/widgets/Button";

const Table = () => {
    const {
        BRANDS,
        columns,
        rows,
        isFetching,
        error,
        isLoading,
        pageNumber,
        searchInput,
        selectedBrands,
        setSearchInput,
        toggleBrand,
        resetFilters,
        handlePageChange,
    } = useTableLogic();

    
    if (error) throw new Error("Something went wrong");
    if (isLoading) return <Spinner size={60} />;
    const isFilter=searchInput||selectedBrands.length


    return (
        <div>
            <div style={{ display: "flex", gap: "1rem", marginBottom: 12 }}>
                {BRANDS.map((brand, i) => (
                    <Checkbox
                        key={i}
                        label={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                    />
                ))}
                <TextField
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{ padding: "4px 8px" }}
                    inputContainer="h-10"
                />
                {isFilter?<Button label="Clear" className="!h-10" onClick={()=>resetFilters()}/>:null}
            </div>
            {!rows?.length ? <Notfound /> :
                <DataTable<ProductType>
                    columns={columns}
                    data={rows}
                    columnVisibility
                    searchAble
                    columnPosition
                    columnVisibilitLable="Column visibility"
                    pagination
                    totalPages={20}
                    currentPage={pageNumber}
                    onPageChange={handlePageChange}
                    variant="classic"
                    inlineEdit
                    onEdit={(row) => console.log(row)}
                    onRowSelectChange={(ids) => console.log(ids)}
                    noDataPlaceholder="No Data"
                />}
            {isFetching && <Spinner size={60} backDrop />}
        </div>
    );
};

export default Table;
