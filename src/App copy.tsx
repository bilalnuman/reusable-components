// import { use, useEffect, useState } from 'react';
// import { Form, type Field } from './components/Select/form/Form';
// import { z } from 'zod';
// import { Controller, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Select, { type Option } from './components/Select';
// import ReactDatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';


// // Helper to generate options
// const generateOptions = (start: number, count: number): Option[] =>
//   Array.from({ length: count }, (_, i) => {
//     const val = start + i;
//     return { value: `opt${val}`, label: `Option ${val}` };
//   });

// // Define fields (only name here for example)
// const fields: Field[] = [
//   {
//     label: 'Date of Birth',
//     name: 'dob',
//     fieldType: 'custom',
//     customComponent: ({ value, onChange }) => (
//       <ReactDatePicker
//         selected={value}
//         onChange={onChange}
//         placeholderText="Select date"
//       />
//     ),
//   },
//   {
//     label: 'Name',
//     name: 'name',
//     placeholder: 'Enter your name',
//     type: 'text',
//     fieldType: 'input',
//   },
// ];

// // Option schema
// const optionShape = z.object({
//   label: z.string(),
//   value: z.string(),
// });

// // Zod validation schema
// const schema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   dob: z.date(),
//   // colors: optionShape.nullable().optional(),
//   colors: z.array(optionShape).optional(),
// });


// const App = () => {
//   const form = useForm({
//     defaultValues: {
//       name:"",
//       colors: [],
//     },
//     resolver: zodResolver(schema),
//   });

//   const [options, setOptions] = useState<Option[]>(generateOptions(1, 20));
//   const [loading, setLoading] = useState(false);

//   const loadMore = () => {
//     if (loading) return;
//     setLoading(true);
//     setTimeout(() => {
//       const newOptions = generateOptions(options.length + 1, 20);
//       setOptions(prev => [...prev, ...newOptions]);
//       setLoading(false);
//     }, 1000);
//   };

//   useEffect(()=>{
//     setTimeout(()=>{},3000)
//   },[])
//   return (
//     <div style={{}}>
//       {/* <Form
//         form={form}
//         fields={fields}
//         validationSchema={schema}
//         onSubmit={data => console.log('Submitted:', data)}
//       >
//         <Controller
//           control={form.control}
//           name="colors"
//           render={({ field }) => (
//             <Select
//               {...field}
//               isMulti={true}
//               options={options}
//               onChange={value => {
//                 console.log(value)
//                 field.onChange(value);
//               }}
//               onLoadMore={loadMore}
//               isLoadingMore={loading}
//               enableInfiniteScroll={true}
//               isCheckIcon={false}
//             />
//           )}
//         />
//       </Form> */}
//     </div>
//   );
// };

// export default App;


import React from 'react'

const Appcopy = () => {
  return (
    <div>App copy</div>
  )
}

export default Appcopy
