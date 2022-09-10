import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { useRegisterMutation, RegisterMutationVariables, MeDocument } from '../generated/graphql';
import NextLink from "next/link";


interface registerProps {
    
}

const Register: React.FC<registerProps> = ({}) => {

    const router = useRouter();

    const defaultFormData: RegisterMutationVariables = {
        email: "",
        password: "",
        name: "",
        age: 0,
        emailUpdates: false,
    }

    const defaultFocuses = {
        emailFocus: false,
        passwordFocus: false,
        nameFocus: false,
        ageFocus: false,
    }

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    const [formData, setFormData] = useState(defaultFormData);
    const [checked, setChecked] = useState(false);
    const [focused, setFocused] = useState(defaultFocuses);

    const {email, password, name, age} = formData;
    const {emailFocus, passwordFocus, nameFocus, ageFocus} = focused;

    formData.emailUpdates = checked;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(!checked);
    }

    const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.id == "email"){
        setFocused((prevState) => ({
            ...prevState,
            emailFocus: true,
        }))};

        if(e.target.id == "password"){
        setFocused((prevState) => ({
            ...prevState,
            passwordFocus: true,
        }))};

        if(e.target.id == "name"){
        setFocused((prevState) => ({
            ...prevState,
            nameFocus: true,
        }))};

        if(e.target.id == "age"){
        setFocused((prevState) => ({
            ...prevState,
            ageFocus: true,
        }))};
    }

    const [mutate, {error}] = useRegisterMutation();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(typeof formData.age == "string"){
            formData.age = parseInt(formData.age);
        }

        if(!validForm){
            return null;
        } else {
            try{
                const response = await mutate({ variables:formData, refetchQueries: [{query: MeDocument}] });
                console.log(response.data?.register.name);
            } catch(error) {
                const stringError = new String(error);
                if(stringError.includes("email")){
                    window.alert("Email already in use")
                }
            } finally{
                router.push("/");
            }

        }
    }



    const emailErrorMessage = email.match(emailRegex) ? null : "Should be a valid email address";
    const passwordErrorMessage = password.match(passwordRegex) ? null :"Must be at least 8 characters and at least 1 uppercase letter, 1 lowercase letter, and 1 number";
    const nameErrorMessage = name.length > 2 ? null : "Name must be at least 3 char long";
    const ageErrorMessage = age > 12 ? null : "You must be 12 or more";

    const validForm = email.match(emailRegex) && password.match(passwordRegex) && name.length > 3 && age > 12

    return (
        <div className="mx-auto w-full max-w-md font-textFont">
            <div className="flex flex-col justify-center items-center">
                <NextLink href="/">
                <img className="cursor-pointer" src="unit-logo-small.png" alt="unitlogo" />
                </NextLink>
                <h1 className="text-4xl font-bold text-slate-900">Create your account</h1>
                <h2 className="mt-2 text-lg font-semibold text-slate-900"> Already have an account?  
                    <a href="#" className="text-orange-400 hover:text-orange-200"> login</a>
                </h2>
            </div>
            <div className="bg-gray-800 py-8 px-10 rounded-lg shadow-xl mt-4">
                <form className="mb-0 space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-md font-medium text-gray-100">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input onBlur={handleFocus} onChange={onChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-customBlue-200 focus:ring-customBlue-200" id="email" name="email" type="email" placeholder='email' />
                            <span className={`text-gray-100 ${emailFocus ? "block" : "hidden" }`}>{emailErrorMessage}</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-md font-medium text-gray-100">
                            Password
                        </label>
                        <div className="mt-1">
                            <input onBlur={handleFocus} onChange={onChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-customBlue-200 focus:ring-customBlue-200" id="password" name="password" type="password" placeholder='password' />
                            <span className={`text-gray-100 ${passwordFocus ? "block" : "hidden" }`}>{passwordErrorMessage}</span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="block text-md font-medium text-gray-100">
                                Name
                            </label>
                            <input onBlur={handleFocus} onChange={onChange} className="mt-1 border-gray-300 rounded-lg shadow-sm focus:border-customBlue-200 focus:ring-customBlue-200" id="name" name="name" type="text" placeholder='name' />
                            <span className={`text-gray-100 ${nameFocus ? "block" : "hidden" }`}>{nameErrorMessage}</span>
                        </div>
                        <div className="flex flex-col ml-2">
                            <label htmlFor="age" className="block text-md font-medium text-gray-100">
                                Age 
                            </label>
                            <input onBlur={handleFocus} onChange={onChange} className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:border-customBlue-200 focus:ring-customBlue-200" id="age" name="age" type="number" placeholder='age' />
                            <span className={`text-gray-100 ${ageFocus ? "block" : "hidden" }`}>{ageErrorMessage}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input onChange={onCheck} id="emailUpdates" name="emailUpdates" type="checkbox" className="rounded border-gray-300 text-customBlue-200 focus:ring-customBlue-200" />
                        <label htmlFor="emailUpdates" className="ml-4 block text-sm text-gray-100"
                          >I would like to receive Unit's
                          <a href="#" className="text-orange-400 hover:text-orange-200"> NewsLetter</a>.
                        </label>
                    </div>
                    
                    <div className="flex justify-center items-center">
                        <div className="relative m-4 w-full">
                             <div className="absolute -inset-1 bg-gradient-to-r from-customBlue-200 to-orange-600 rounded-lg blur"></div>
                                 <button type="submit" className=" text-orange-400 text-xl font-bold w-full relative px-7 py-6 bg-slate-700 rounded-lg leading-none text-md hover:bg-slate-600">
                                        Register
                                 </button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default Register