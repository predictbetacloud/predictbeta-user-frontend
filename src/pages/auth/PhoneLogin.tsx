import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { loginAPI } from "../../api/authAPI";
import { selectAuth } from "../../state/slices/auth";
import { Input } from "../../components/inputs/Input";
import { P } from "../../components/Texts";
import ErrorMessage from "../../components/inputs/ErrorMessage";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Button from "../../components/Buttons";
import CustomPhoneInput from "../../components/inputs/CustomPhoneInput";

const PhoneLogin = () => {
  const dispatch = useAppDispatch();
  const { isPerformingAuthAction } = useAppSelector(selectAuth);

  const [showPassword, setShowPassword] = useState(false);

  // Form Handler
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Form Submission Handler
  const submit = ({ mobileNumber, password }: FieldValues) => {
    dispatch(
      loginAPI({ phoneNumber: mobileNumber, password, loginType: "PHONE" })
    );
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mt-2 w-full md:w-[400px]">
      {/* Phone Number */}
      <div className="mt-5">
        <label htmlFor="mobileNumber" className="mb-2 block">
          <P className="text-[#222222] text-sm">Phone number</P>
        </label>
        <Controller
          control={control}
          name="mobileNumber"
          rules={{
            required: "Please enter your phone number",
          }}
          render={({ field: { onChange, value } }) => (
            <CustomPhoneInput
              onChange={onChange}
              value={value}
              defaultCountry="NG"
              placeholder="Your phone number"
              className={errors.mobileNumber ? "invalid" : ""}
            />
          )}
        />
        {errors?.mobileNumber && (
          <ErrorMessage
            message={
              errors?.mobileNumber && errors?.mobileNumber.message?.toString()
            }
          />
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
        <p className="text-[#EB1536]">Forgot password?</p>
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
        Don’t have an account?{" "}
        <Link to="/register" className="">
          <span className="text-[#EB1536]">Create account</span>
        </Link>
      </p>
    </form>
  );
};

export default PhoneLogin;
