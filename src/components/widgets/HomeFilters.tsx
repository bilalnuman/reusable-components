import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import List from './List';
import ListItem from './ListItem';
import Button from './Button';
import Select, { type Option } from '@components/widgets/Select';

export type Brand = {
    value: string;
    label: string;
};

const yearOptions: Option[] = [
    { value: '2002', label: '2002' },
    { value: '2003', label: '2003' },
    { value: '2005', label: '2005' },
];

const brands: Brand[] = [
    { value: 'rolex', label: 'Rolex' },
    { value: 'fitbit', label: 'Fit Bit' },
    { value: 'smartwatch', label: 'Smart Watch' },
];

export type FiltersState = {
    brands: string[];
    model: boolean;
    year: string | null;
};

interface HomeFiltersProps {
    onClick: (filters: FiltersState) => void;
}

export const HomeFilters = ({ onClick }: HomeFiltersProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState<FiltersState>({
        brands: searchParams.get('brands')?.split(',') ?? [],
        model: searchParams.get('model') === 'true',
        year: searchParams.get('year') ?? null,
    });


    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFilters(prev => {
            const newBrands = checked
                ? [...prev.brands, value]
                : prev.brands.filter(b => b !== value);
            return { ...prev, brands: newBrands };
        });
    };


    const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, model: e.target.checked }));
    };

    const handleSelectChange = (value: Option | null) => {
        const selected = Array.isArray(value) ? value[0] ?? null : value;
        setFilters(prev => ({ ...prev, year: selected?.value ?? null }));
    };

    const handleApply = () => {
        const params: Record<string, string> = {};

        if (filters.brands.length > 0) params.brands = filters.brands.join(',');
        if (filters.model) params.model = filters.model.toString();
        if (filters.year) params.year = filters.year;

        setSearchParams(params);
        onClick(filters);
    };
    const handleClear = () => {
        const defaultFilters: FiltersState = { brands: [], model: false, year: null };
        setFilters(defaultFilters);
        setSearchParams({});
        onClick(defaultFilters);
    };
    const selectedYear = yearOptions.find(opt => opt.value === filters.year);

    return (
        <>
            <List className="flex items-center gap-3 flex-wrap">
                <ListItem className="flex flex-col gap-1">
                    <label>Brands</label>
                    {brands.map(brand => (
                        <label key={brand.value} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value={brand.value}
                                checked={filters.brands.includes(brand.value)}
                                onChange={handleBrandChange}
                            />
                            {brand.label}
                        </label>
                    ))}
                </ListItem>
                <ListItem className="flex items-center gap-2">
                    <label htmlFor="model">Model</label>
                    <input
                        type="checkbox"
                        id="model"
                        checked={filters.model}
                        onChange={handleModelChange}
                    />
                </ListItem>
                <ListItem className="flex items-center gap-2">
                    <label htmlFor="year">Year</label>
                    <Select
                        value={selectedYear ?? null}
                        options={yearOptions}
                        onChange={(val) => handleSelectChange(val as Option)}
                        placeholder="Select year"
                    />
                </ListItem>
            </List>

            <div className="mt-5 flex gap-2">
                <Button label="Apply" onClick={handleApply} className="px-5" />
                <Button label="Clear" onClick={handleClear} variant="bordered" className="px-5" />
            </div>
        </>
    );
};

export default HomeFilters;
