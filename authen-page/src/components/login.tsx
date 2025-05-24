import React from 'react';
import { PrimaryButton } from './FormElements/Button';
import Input from './FormElements/Input';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value;
        const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement)?.value;

        console.log(email, password);

        // Call the onLogin function passed as prop
        onLogin();
    };

    return (
        <div className="h-screen flex bg-gray-bg1">
            <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
                <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
                    Log in to your account 🔐
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Your Email"
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Your Password"
                    />

                    <div className="flex justify-center items-center mt-6">
                        <PrimaryButton type="submit">
                            Continue with Email
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;