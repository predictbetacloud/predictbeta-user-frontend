import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { FieldValues, useForm } from "react-hook-form";
import { loginAPI } from "../../api/authAPI";
import { selectAuth } from "../../state/slices/auth";
import { Input } from "../../components/inputs/Input";
import { P } from "../../components/Texts";
import ErrorMessage from "../../components/inputs/ErrorMessage";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Button from "../../components/Buttons";

const EmailLogin = () => {
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
  const submit = ({ email, password }: FieldValues) => {
    dispatch(loginAPI({ email, password, loginType: "EMAIL" }));
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="mt-4 w-full md:w-[400px]">
      {/* Email */}
      <div className="mt-5">
        <label htmlFor="email" className="mb-2 block">
          <P className="text-[#222222] text-sm">Email address or username</P>
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter email or Username"
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
            placeholder="Enter password here"
            {...register("password", {
              required: "Please enter password",
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

      <Link to="/forgot-password" className="w-fit ml-auto block text-xs mt-4">
        <p className="text-[var(--primary-gold)] hover:underline">Forgot password?</p>
      </Link>

      <div className="mt-5">
        <Button
          className="w-full"
          title="Log in"
          type="submit"
          loading={isPerformingAuthAction}
        />
      </div>

      <p className="mt-4 md:text-center text-xs">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="">
          <span className="text-[var(--primary-gold)] hover:underline ">
            Create account
          </span>
        </Link>
      </p>
    </form>
  );
};

export default EmailLogin;
