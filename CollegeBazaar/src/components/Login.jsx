import React, { useState } from 'react';
import authService from '../appwrite/auth';
import Input from './Input';
import Logo from './Logo';
import Button from './Button';
import { login as storeLogin } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                console.log(authService.getCurrentUser());
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(storeLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400 p-4'>
            <div className='w-full max-w-lg bg-white shadow-lg rounded-lg p-8 sm:p-10 border border-gray-200'>
                <div className='mb-6 flex justify-center'>
                    <Logo width='100%' />
                </div>
                <h2 className="text-center text-3xl font-semibold text-gray-800">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-all duration-200"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-6'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-all duration-200"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
