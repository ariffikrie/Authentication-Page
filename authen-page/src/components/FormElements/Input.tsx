import React from 'react';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    required = false,
    error,
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-1"
            />
            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};

export default Input;