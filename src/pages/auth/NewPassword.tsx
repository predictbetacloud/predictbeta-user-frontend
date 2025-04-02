import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import logo from "../../assets/logo/newLogoFull.svg";

import ErrorMessage from "../../components/inputs/ErrorMessage";
import { P } from "../../components/Texts";
import { Input } from "../../components/inputs/Input";
import Button from "../../components/Buttons";

import { newPasswordAPI } from "../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { Link } from "react-router-dom";

const NewPassword = () => {
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
  const submit = ({ oneTimePassword, password }: FieldValues) => {
    dispatch(newPasswordAPI({ oneTimePassword, password }));
    console.log({ oneTimePassword, password });
  };

  return (
    <main className="w-screen h-screen px-4 md:px-0 bg-[#FFFFFF] flex flex-col items-center justify-center">
      <div className="max-w-lg p-4 flex flex-col gap-2 justify-center items-center border-2 rounded-lg">
        <img src={logo} alt="PredictBeta" />
        <form
          onSubmit={handleSubmit(submit)}
          className="mt-10 md:min-w-[400px]"
        >
          <div className="text-center">
            <h3 className="text-xl text-[#222222] font-semibold mb-1">
              Set a new password
            </h3>
            <p className="text-[#929292] mb-8 text-[14px] ">
              Create a new password. Ensure it differs from <br /> previous ones
              for security
            </p>
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
                placeholder="Enter new password here"
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

          <div className="mt-5">
            <label htmlFor="password" className="mb-2 block">
              <P className="text-[#222222] text-sm">Confirm Password</P>
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password here"
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

          <div className="mt-5">
            <Button
              className="w-full"
              title="Submit"
              type="submit"
              loading={isPerformingAuthAction}
            />
          </div>

          <p className="mt-4 md:text-center text-xs">
            Remember your password?{" "}
            <Link to="/login" className="">
              <span className="text-[var(--primary-gold)] hover:underline ">Log in</span>
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default NewPassword;
