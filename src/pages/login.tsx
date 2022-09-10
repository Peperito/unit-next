import React, { useState } from 'react'
import { useRouter } from 'next/router';
import NextLink from "next/link";
import { LoginMutationVariables, useLoginMutation, MeDocument } from '../generated/graphql';


interface loginProps {
    
}

const Login: React.FC<loginProps> = ({}) => {

    const router = useRouter();
    const errorMessage = "Wrong username or password"

    const defaultFormData: LoginMutationVariables = {
        email: "",
        password: "",
    }

    const [formData, setFormData] = useState(defaultFormData);
    const [errorState, setErrorState] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const [mutate, {error}] = useLoginMutation();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await mutate({ variables:formData, refetchQueries: [{query: MeDocument}] });
        if(!response.data?.login.user?.name){
            setErrorState(true)
        } else {
            router.push("/")
        }
    }

    return (
        <div className="mx-auto w-full max-w-md font-textFont">
            <div className="flex flex-col justify-center items-center">
                <NextLink href="/">
                <img className="cursor-pointer" src="unit-logo-small.png" alt="unitlogo" />
                </NextLink>
                <h1 className="text-4xl font-bold text-slate-900 text-center">Log into your account</h1>
            </div>
            <div className="bg-gray-800 py-8 px-10 rounded-lg shadow-xl mt-4">
                <form className="mb-0 space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-md font-medium text-gray-100">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input onChange={onChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-customBlue-200 focus:ring-customBlue-200" id="email" name="email" type="email" placeholder='email' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-md font-medium text-gray-100">
                            Password
                        </label>
                        <div className="mt-1">
                            <input  onChange={onChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-customBlue-200 focus:ring-customBlue-200" id="password" name="password" type="password" placeholder='password' />
                            <span className={`text-red-300 ${errorState ? "block" : "hidden" }`}>{errorMessage}</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-center items-center">
                        <div className="relative m-4 w-full">
                             <div className="absolute -inset-1 bg-gradient-to-r from-customBlue-200 to-orange-600 rounded-lg blur"></div>
                                 <button type="submit" className=" text-orange-400 text-xl font-bold w-full relative px-7 py-6 bg-slate-700 rounded-lg leading-none text-md hover:bg-slate-600">
                                        Login
                                 </button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default Login