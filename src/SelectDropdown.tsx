import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { Option } from './components/widgets/Select';
import Select from './components/widgets/Select';

const generateOptions = (start: number, count: number): Option[] =>
  Array.from({ length: count }, (_, i) => {
    const val = start + i;
    return { value: `opt${val}`, label: `Option ${val}` };
  });

type FormData = {
  favoriteColor: Option | null;
  preferredColors: Option[];
  colors: Option[];
};

const SelectDropdown: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      favoriteColor: null,
      preferredColors: [],
      colors: [],
    },
  });

  const [options, setOptions] = useState<Option[]>(generateOptions(1, 4));
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newOptions = generateOptions(options.length + 1, 20);
      setOptions((prev) => [...prev, ...newOptions]);
      setLoading(false);
    }, 1000);
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '2rem', maxWidth: 400 }}>
      <h2>1️⃣ Single Select</h2>
      {/* <Controller
        control={control}
        name="favoriteColor"
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder='Select colors'
            isCheckIcon={false}
          />
        )}
      />

      <h2>2️⃣ Multi Select</h2>
      <Controller
        control={control}
        name="preferredColors"
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isMulti={true}
            prefixClass='colors'
            getSingleValue={(value)=>console.log(value)}
          />
        )}
      />

      <h2>3️⃣ Infinite Scroll Multi Select</h2>
      <Controller
        control={control}
        name="colors"
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            onLoadMore={loadMore}
            isLoadingMore={loading}
            enableInfiniteScroll={true}  
            isCheckIcon={false}          
          />
        )}
      /> */}

      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SelectDropdown;
