import React, { type ComponentType, type ReactNode } from 'react';
import './index.css';
import {
    useForm,
    Controller,
    type ControllerRenderProps,
    type UseFormReturn,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodTypeAny } from 'zod';
import Select, { type Option } from '../Select';

function sanitizeHtml(html: string): string {
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/on\w+="[^"]*"/gi, '');
    html = html.replace(/on\w+='[^']*'/gi, '');
    html = html.replace(/(href|src)=["']?javascript:[^"'>\s]*["']?/gi, '');
    html = html.replace(/<(?!\/?(div|h[1-6])(?=>|\s))\/?[^>]+>/gi, '');
    return html;
}

export interface Field {
    label: string;
    name: string;
    placeholder?: string;
    type?: "text" | "checkbox" | "radio" | "email" | "password" | "hidden" | "date" | "datetime-local" | "time";
    fieldType: 'input' | 'select' | 'textarea' | "custom";
    options?: Option[];
    rowHtml?: string;
    isMulti?: boolean;
    customComponent?: ComponentType<ControllerRenderProps<any, string>>;
}

export interface FormProps {
    fields: Field[];
    validationSchema?: ZodTypeAny;
    validationMode?: "onSubmit" | "onBlur" | "onChange" | "onTouched" | "all";
    onSubmit: (data: any) => void;
    children?: ReactNode;
    Component?: ComponentType<ControllerRenderProps<any, string>>;
    form?: UseFormReturn<any>;
    buttonText?: string
}

export const Form: React.FC<FormProps> = ({
    fields,
    validationSchema,
    validationMode = "onChange",
    onSubmit,
    children,
    form,
    buttonText = "Submit"
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form || useForm({
        mode: validationMode,
        resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
                <div key={index} id={field.name} className={`field-container ${field.name} ${errors[field.name] ? "is-error" : ""} ${field.type || ""}`}>
                    {field?.rowHtml && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(field.rowHtml),
                            }}
                        />
                    )}

                    <label>{field.label}</label>

                    <Controller
                        name={field.name}
                        control={control}
                        render={({ field: controllerField }) => {
                            switch (field.fieldType) {
                                case 'custom':
                                    return field.customComponent ? <field.customComponent {...controllerField} /> : <></>;

                                case 'input':
                                    if (field.type === 'checkbox') {
                                        return (
                                            <input
                                                {...controllerField}
                                                type="checkbox"
                                                checked={!!controllerField.value}
                                            />
                                        );
                                    }

                                    if (field.type === 'radio' && field.options?.length) {
                                        return (
                                            <div>
                                                {field.options.map((opt) => (
                                                    <label key={opt.value} style={{ marginRight: '1rem' }}>
                                                        <input
                                                            type="radio"
                                                            value={opt.value}
                                                            checked={controllerField.value === opt.value}
                                                            onChange={(e) => controllerField.onChange(e.target.value)}
                                                            name={field.name}
                                                        />
                                                        {opt.label}
                                                    </label>
                                                ))}
                                            </div>
                                        );
                                    }

                                    return (
                                        <input
                                            {...controllerField}
                                            className='form-field'
                                            type={field.type || 'text'}
                                            placeholder={field.placeholder}
                                        />
                                    );

                                case 'textarea':
                                    return (
                                        <textarea
                                            {...controllerField}
                                            placeholder={field.placeholder}
                                        />
                                    );

                                case 'select':
                                    return (
                                        <Select
                                            {...controllerField}
                                            isMulti={field.isMulti}
                                            options={field.options || []}
                                            placeholder={field.placeholder || 'Select'}
                                            isCheckIcon={false}
                                        />
                                    );

                                default:
                                    return <></>;
                            }
                        }}
                    />

                    {errors[field.name] && (
                        <p className="error">
                            {String(errors[field.name]?.message)}
                        </p>
                    )}
                </div>
            ))}

            {children}
            <button type="submit">{buttonText}</button>
        </form>
    );
};
