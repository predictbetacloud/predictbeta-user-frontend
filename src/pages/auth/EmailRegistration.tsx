import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

import ErrorMessage from "../../components/inputs/ErrorMessage";
import { P } from "../../components/Texts";
import { Input } from "../../components/inputs/Input";
import Button from "../../components/Buttons";

import { signUpAPI } from "../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const EmailRegistration = () => {
    const dispatch = useAppDispatch();
	const { isPerformingAuthAction } = useAppSelector(selectAuth);

	const [showPassword, setShowPassword] = useState(false);

	// Form Handler
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Form Submission Handler
	const submit = ({
		email,
		password,
		firstName,
		lastName,
		userName,
	}: FieldValues) => {
		dispatch(
			signUpAPI({
				email,
				password,
				firstName,
				middleName: userName,
				surname: lastName,
                signUpType:'EMAIL'
			})
		);
	};
  return (
    <form onSubmit={handleSubmit(submit)} className="md:w-[400px]">

        {/* user name */}
        <div className="mt-5">
            <label htmlFor="userName" className="mb-2 block">
                <P className="text-[#222222] text-sm">User name</P>
            </label>
            <Input
                id="userName"
                type="text"
                placeholder="Your user name"
                {...register("userName", {
                    required: "Enter your user name",
                })}
                className={`w-full input ${errors?.userName ? "invalid" : ""}`}
            />
            {errors?.userName && (
                <ErrorMessage message={errors.userName.message?.toString()} />
            )}
        </div>

        {/* Email */}
        <div className="mt-5">
            <label htmlFor="email" className="mb-2 block">
                <P className="text-[#222222] text-sm">Email address</P>
            </label>
            <Input
                id="email"
                type="email"
                placeholder="Your email"
                {...register("email", {
                    required: "Enter a valid email",
                })}
                className={`w-full input ${errors?.email ? "invalid" : ""}`}
            />
            {errors?.email && (
                <ErrorMessage message={errors.email.message?.toString()} />
            )}
        </div>

        {/* Passowrd */}
        <div className="mt-5">
            <label htmlFor="password" className="mb-2 block">
                <P className="text-[#222222] text-sm">Password</P>
            </label>
            <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter strong password"
                    {...register("password", {
                        required: "Please enter password",
                        pattern:{value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/, message:'Password must be at least 8 characters and Contain, One special character, One uppercase, One lower case'}
                    })}
                    className={`w-full input ${errors?.password ? "invalid" : ""}`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 flex items-center h-full top-0"
                >
                    {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
            </div>
            {errors?.password && (
                <ErrorMessage message={errors.password.message?.toString()} />
            )}
        </div>

        <p className="text-xs mt-4">
            By creating an account, you agree that you’re above 18 years of age
            and also to our{" "}
            <Link to="/terms" className="">
                <span className="text-[#EB1536]">Terms & Conditions</span>
            </Link>
        </p>

        <div className="mt-5">
            <Button
                className="w-full"
                title="Create account"
                type="submit"
                loading={isPerformingAuthAction}
            />
        </div>
        <p className="mt-4 md:text-center text-xs">
            Have an account with HallBet?{" "}
            <Link to="#" className="">
                <span className="text-[#EB1536]">Confirm</span>
            </Link>
        </p>

        <p className="mt-4 md:text-center text-xs">
            Have an account?{" "}
            <Link to="/login" className="">
                <span className="text-[#EB1536]">Log in</span>
            </Link>
        </p>
    </form>
  )
}

export default EmailRegistration