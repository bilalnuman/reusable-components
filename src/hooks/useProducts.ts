import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchProducts,
    fetchProductById,
    createProduct,
} from '../services/productService';

// List products

export const useProducts = (filters: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    enabled,
    staleTime: filters ? 1000 * 60 : 0,
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
