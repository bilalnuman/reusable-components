import {
    useState,
    forwardRef,
    useImperativeHandle,
    useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import List from './List';
import ListItem from './ListItem';
import Button from './Button';
import Select from '@components/widgets/Select';

export interface Option {
    value: string;
    label: string;
}

export interface SelectedFilters {
    brand: Option[];
    model: boolean;
    year: Option | null;
}

export interface FiltersRef {
    reset: () => void;
    getFilters: () => SelectedFilters;
}

interface FiltersProps {
    options: Option[];
    brands: Option[];
    onApply: (filters: string) => void;
    onChange?: (filters: string) => void;
    filterOnChange?: boolean
}

export const Filters = forwardRef<FiltersRef, FiltersProps>(
    ({ brands, options, onApply, onChange, filterOnChange = false }, ref) => {
        const [searchParams, setSearchParams] = useSearchParams();

        const [localFilters, setLocalFilters] = useState<SelectedFilters>({
            brand: [],
            model: false,
            year: null,
        });
        useEffect(() => {
            const brandsFromUrl = searchParams.getAll('brand');
            const modelFromUrl = searchParams.get('model') === 'true';
            const yearFromUrl = searchParams.get('year');

            const selectedBrands = brands.filter((b) =>
                brandsFromUrl.includes(b.value)
            );
            const selectedYear = options.find((o) => o.value === yearFromUrl) || null;

            setLocalFilters({
                brand: selectedBrands,
                model: modelFromUrl,
                year: selectedYear,
            });
        }, [brands, options]);

        const updateFilter = (field: keyof SelectedFilters, value: any) => {
            setLocalFilters((prev) => ({
                ...prev,
                [field]: value,
            }));
        };

        const handleBrandToggle = (brand: Option, isChecked: boolean) => {
            const updated = isChecked
                ? [...localFilters.brand, brand]
                : localFilters.brand.filter((b) => b.value !== brand.value);
            updateFilter('brand', updated);
        };

        const formatFilters = () => {
            const params = new URLSearchParams();
            localFilters.brand.forEach((b) => params.append('brand', b.value));
            if (localFilters.model) params.set('model', 'true');
            if (localFilters.year) params.set('year', localFilters.year.value);
            setSearchParams(params);
            return params.toString()
        }

        const handleApply = () => {
            const params = formatFilters()
            !filterOnChange && onApply(params);
        };

        useImperativeHandle(ref, () => ({
            reset: () => {
                const resetFilters = {
                    brand: [],
                    model: false,
                    year: null,
                };
                setLocalFilters(resetFilters);
                setSearchParams(new URLSearchParams());
            },
            getFilters: () => localFilters,
        }));

        useEffect(() => {
            if (filterOnChange) {
                const params = formatFilters()
                onChange(params)
            }
        }, [localFilters, filterOnChange])

        return (
            <>
                <List className="flex items-center gap-3 flex-wrap">
                    <ListItem className="flex flex-col gap-1">
                        <label>Brands</label>
                        {brands.map((brand) => {
                            const isChecked = localFilters.brand.some(
                                (b) => b.value === brand.value
                            );
                            return (
                                <label key={brand.value} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={brand.value}
                                        checked={isChecked}
                                        onChange={(e) =>
                                            handleBrandToggle(brand, e.target.checked)
                                        }
                                    />
                                    {brand.label}
                                </label>
                            );
                        })}
                    </ListItem>

                    <ListItem className="flex items-center gap-2">
                        <label htmlFor="model">Model</label>
                        <input
                            type="checkbox"
                            id="model"
                            checked={localFilters.model}
                            onChange={(e) => updateFilter('model', e.target.checked)}
                        />
                    </ListItem>

                    <ListItem className="flex items-center gap-2">
                        <label htmlFor="year">Year</label>
                        <Select
                            value={localFilters.year}
                            options={options}
                            onChange={(value) => updateFilter('year', value)}
                            placeholder="Select year"
                        />
                    </ListItem>
                </List>

                <div className="mt-5 flex gap-2">
                    <Button label="Apply" onClick={handleApply} className="px-5" />
                </div>
            </>
        );
    }
);

Filters.displayName = 'Filters';

export default Filters;
