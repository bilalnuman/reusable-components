import { create } from 'zustand';

interface Product {
    id: number;
    model_name: string;
    buying_price: string;
    image: string;
    condition: string;
    year: number;
    [key: string]: any;
}

interface ProductMetaData {
    count: number;
    next: string | null;
    previous: string | null;
    results: Product[];
}

interface ProductState {
    data: ProductMetaData | null;
    setProducts: (data: ProductMetaData) => void;
    addProduct: (product: Product) => void;
    removeProduct: (id: number) => void;
    resetProducts: () => void;
}

const useProductStore = create<ProductState>((set) => ({
    data: null,

    setProducts: (data) => set({ data }),

    addProduct: (product) =>
        set((state) => {
            if (!state.data) {
                return {
                    data: {
                        count: 1,
                        next: null,
                        previous: null,
                        results: [product],
                    },
                };
            }

            return {
                data: {
                    ...state.data,
                    count: state.data.count + 1,
                    results: [...state.data.results, product],
                },
            };
        }),

    removeProduct: (id) =>
        set((state) => {
            if (!state.data) return state;
            return {
                data: {
                    ...state.data,
                    results: state.data.results.filter((p) => p.id !== id),
                    count: state.data.count - 1,
                },
            };
        }),

    resetProducts: () => set({ data: null }),
}));

export default useProductStore;