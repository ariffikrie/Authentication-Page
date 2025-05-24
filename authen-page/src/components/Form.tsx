import React, { useState } from "react";
import axios, { AxiosError } from 'axios';

interface ErrorResponse {
    message: string;
}

const Form: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError("");
        alert("You are Signed In");

        try {
            await axios.post(`http://localhost:5173/api/signin`, {
                email,
                password
            });
        } catch (e) {
            const error = e as AxiosError<ErrorResponse>;
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred during sign in");
            }
        }
    };

    const toggleShowPassword = (): void => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-[#0e387a] h-screen mx-auto">
            <h1 className='text-center text-3xl text-[#9fafca] hover:text-[#b8df10] font-extrabold pt-10 pb-10'>
                Sign In Form
            </h1>
            {error ? (
                <div className="text-red-500 text-center mb-4">{error}</div>
            ) : (
                ''
            )}
            <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col pt-10">
                    <label htmlFor="email" className="text-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="border-none mb-3 rounded-md p-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <label htmlFor="password" className="text-white">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="rounded-md border-none pr-12 p-2 w-full"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-2 flex items-center"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? (
                                <i className="fas fa-eye-slash fa-lg"></i>
                            ) : (
                                <i className="fas fa-eye fa-lg"></i>
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="rounded-full text-lg leading-4 font-medium bg-blue-500 hover:bg-sky-700 h-8 mt-5 text-white"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;