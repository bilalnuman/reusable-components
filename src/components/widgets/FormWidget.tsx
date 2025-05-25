import { useForm, Controller } from 'react-hook-form';
import { FiCalendar } from 'react-icons/fi';
import clsx from 'clsx';
import TextField from './TextField';
import Select from '../Select';
import DatePicker from '../Datepicker';

type FormValues = {
    name: string;
    date: string;
    classes: string;
};

const FormWidget = () => {
    const { handleSubmit, control } = useForm<FormValues>();

    const handleDateChange = (dates) => {
        console.log('Selected dates:', dates);
    };

    const onSubmit = (data: FormValues) => {
        console.log('Form submitted:', data);
    };

    const inputClass = clsx('h-11');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                        isFloating
                        inputClass={inputClass}
                    />
                )}
            />
            <Controller
                name="date"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="date"
                        label="Select date"
                        type="date"
                        isFloating
                        icon={<FiCalendar className="text-gray-400" />}
                        iconClass="pointer-events-none flex items-center justify-end bg-white"
                        inputClass={inputClass}
                    />
                )}
            />
            <Controller
                name="classes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Select
                        options={[{ value: "Bilal", label: "Bilal" }, { value: "Ali", label: "Ali" }]}
                        {...field}
                        headerClass='w-full rounded border border-gray-300 appearance-none focus:outline-none focus:ring focus:ring-blue-400 peer'
                        containerClass='w-full'
                        searchable={true}
                    />
                )}
            />

            <div>
                <h2>Single Date Picker</h2>
                <DatePicker onChange={handleDateChange} />

                <h2>Multiple Date Picker</h2>
                <DatePicker multiple={true} onChange={handleDateChange} />
            </div>

            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Submit
            </button>
        </form>
    );
};

export default FormWidget;
