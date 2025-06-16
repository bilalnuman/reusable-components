import { useForm, Controller } from 'react-hook-form';
import clsx from 'clsx';
import Select, { type Option } from './Select';
import DatePicker from './Datepicker';
import Dropdown from './Dropdown';
import TextField from './TextField';
import { useState } from 'react';

type FormValues = {
    name: string;
    date: string;
    dob: Date;
    classes: Option;
    menu: string
};
import { FaApple } from 'react-icons/fa';
import Checkbox from './Checkbox';
import Radio from './Radio';
import TextArea from './Textarea';

const options = [
    { value: 'apple', label: 'Apple', icon: <FaApple /> },
    { value: 'banana', label: 'Banana', icon: <FaApple /> },
    { value: 'cherry', label: 'Cherry', icon: <FaApple /> },
];

const classOptions: Option[] = [
    { value: "Class A", label: "Class A" },
    { value: "Class B", label: "Class B" },
]
const FormWidget = () => {
    const { handleSubmit, control } = useForm<FormValues>();
    const [selected, setSelected] = useState<string | number>('apple');
    const handleDateChange = (dates) => {
        console.log('Selected dates:', dates);
    };

    const onSubmit = (data: FormValues) => {
        console.log('Form submitted:', data);
    };

    const inputClass = clsx('h-11');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* <input type='date'/>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="name"
                        label="Enter your name"
                        type="text"
                        inputClass={inputClass}
                    />
                )}
            />
            <Controller
                name="classes"
                control={control}
                render={({ field }) => (
                    <Select
                        options={classOptions}
                        {...field}
                        isMulti
                        searchable
                        headerClass='w-full rounded border border-gray-300 peer'
                        containerClass='w-full'
                    />
                )}
            />

            <div>
                <h2>Single Date Picker</h2>
                <Controller
                    name="dob"
                    control={control}
                    render={({ field }) => (
                        <DatePicker {...field} />
                    )}
                />
                <h2>Multiple Date Picker</h2>
                <DatePicker multiple={true} onChange={handleDateChange} />
            </div>

            <div>
                <Dropdown
                    value={selected}
                    onChange={setSelected}
                    options={options}
                    animated
                    placeholder="Select a fruit"
                    iconPosition='right'
                />
            </div>
            <Checkbox value="remember" label='Remember me' onChange={(e) => console.log(e.target.value)} />
            <Radio value="male" label='Male' name='gender' onChange={(e) => console.log(e.target.value)} />
            <Radio value="female" label='Female' name='gender' onChange={(e) => console.log(e.target.value)} />
            <TextArea />
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Submit
            </button> */}
        </form>
    );
};

export default FormWidget;
