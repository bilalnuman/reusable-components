// import { useEffect, useState } from 'react';
// import { useProducts } from '../hooks/useProducts';
// import { useProductStore } from '../stores';
// import { Notfound, Spinner } from '../components/widgets';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import Button from '@src/components/widgets/Button';
// import { HomeFilters, type FiltersState } from '@src/components/widgets/HomeFilters';

// const Products = () => {

//     const navigate = useNavigate();
//     const [searchParams] = useSearchParams();
//     const [filtersReady, setFiltersReady] = useState(false);
//     const [filters, setFilters] = useState<FiltersState>({
//         brands: [],
//         model: false,
//         year: null,
//     });

//     useEffect(() => {
//         const brands = searchParams.get('brands')?.split(',') ?? [];
//         const model = searchParams.get('model') === 'true';
//         const year = searchParams.get('year') ?? null;

//         const parsedFilters: FiltersState = { brands, model, year };
//         setFilters(parsedFilters);
//         setFiltersReady(true);
//     }, []);

//     const queryFilters = Object.fromEntries(
//         Object.entries(filters).filter(([_, v]) => {
//             if (Array.isArray(v)) return v.length > 0;
//             return Boolean(v);
//         })
//     );

//     const { data, isLoading, isError, error } = useProducts(queryFilters, filtersReady);
//     const { data: storeData, setProducts, removeProduct, resetProducts } = useProductStore();

//     useEffect(() => {
//         if (data) {
//             resetProducts();
//             setProducts(data);
//         }
//     }, [data]);

//     const handleApplyFilters = (filters: FiltersState) => {
//         setFilters(filters);
//     };

//     if (!filtersReady) return null;

//     if (isError) throw error;
//     if (isLoading) return <Spinner size={40} backDrop={true} />;
//     if (!storeData?.count) return <Notfound />;

//     return (
//         <div>
//             <HomeFilters onClick={handleApplyFilters} />
//             <Button label="Reset" onClick={() => resetProducts()} />
//             <button onClick={() => navigate("/products/create")}>Add Item</button>

//             <h2>Product Data:</h2>
//             <ul>
//                 {storeData.results.map((item) => (
//                     <li key={item.id}>
//                         {item.model_name}
//                         <button onClick={() => removeProduct(item.id)}>Remove product</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Products;


import React from 'react'

const Products = () => {
    return (
        <div>index</div>
    )
}
export default Products
