import React from 'react';

interface ButtonProps {
    type?: 'submit' | 'button' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
    type = 'button',
    onClick,
    disabled = false,
    className = '',
    children,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`bg-primary hover:bg-primaryDark py-2 px-6 text-white rounded border border-primary focus:outline-none focus:border-primaryDark transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </button>
    );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
    type = 'button',
    onClick,
    disabled = false,
    className = '',
    children,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`bg-white hover:bg-gray-100 py-2 px-6 text-primary rounded border border-gray-300 focus:outline-none focus:border-primary transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </button>
    );
};