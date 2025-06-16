import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchProducts,
    fetchProductById,
    createProduct,
} from '../services/productService';

// List products

export const useProducts = (query: string) => {
    return useQuery({
        queryKey: ['products', query],
        queryFn: () => fetchProducts(query),
        staleTime: 0,
        placeholderData:(prev)=>prev
    });
};




// Get single product
export const useProduct = (id: string) =>
    useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
        enabled: !!id,
    });

// Create product
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
