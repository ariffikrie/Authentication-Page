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
        <div className="flex w-half h-full bg-[#27374D]">
            <div className="bg-[#fdfaf6b1] m-15 h-150 mx-auto w-150 rounded-2xl shadow-lg shadow-black">
                <div className="flex flex-col items-center pt-20">
                    <img
                        src="./src/assets/maf-high-resolution-logo.png"
                        alt="Login Logo"
                        className=" rounded-2xl w-24 h-24 mb-4"
                    />
                    <h1 className='text-center text-3xl text-[#222324] hover:text-[#3F7D58] font-extrabold'>
                        Member Login
                    </h1>
                </div>
                {error ? (
                    <div className="text-red-500 text-center mb-4">{error}</div>
                ) : (
                    ''
                )}
                <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col pt-10">
                        <label htmlFor="email" className="pl-2 pb-3 text-black text-lg text-left">Username</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-[#EAEAEA] border-none border-2 mb-3 rounded-xl text-black p-2"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password" className="pl-2 pb-3 text-black text-lg text-left">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="bg-[#EAEAEA] rounded-xl border-none text-black pr-12 p-2 w-full"
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
                                    <i className="fas fa-eye-slash fa-lg text-black"></i>
                                ) : (
                                    <i className="fas fa-eye fa-lg text-black"></i>
                                )}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="rounded-full text-lg leading-4 font-medium bg-[#3F72AF] hover:bg-[#3F7D58] h-10 mt-5 text-white"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Form;