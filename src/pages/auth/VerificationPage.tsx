import { useState } from "react";

import { FieldValues, useForm } from "react-hook-form";

import logo from "../../assets/logo/newLogoFull.svg";

import ErrorMessage from "../../components/inputs/ErrorMessage";
import { P } from "../../components/Texts";
import { Input } from "../../components/inputs/Input";
import Button from "../../components/Buttons";

import { newPasswordAPI } from "../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useLocation } from "react-router-dom";

const NewPassword = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { isPerformingAuthAction } = useAppSelector(selectAuth);
  const [otp, setOtp] = useState("");

  // Form Handler
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const mobileNumber = location.state?.mobileNumber || "your phone";
  const maskedNumber = mobileNumber
    ? `*** *** ***${mobileNumber.slice(-2)}`
    : "your phone";

  // Handle OTP Change
  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
    setValue("oneTimePassword", otpValue, { shouldValidate: true });
  };

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
              Check your phone
            </h3>
            <p className="text-[#929292] mb-8 text-[14px] ">
              Enter the OTP sent to {maskedNumber}
            </p>
          </div>

          {/* OTP */}
          <div className="mt-5">
            <label htmlFor="oneTimePassword" className="mb-2 block">
              <P className="text-[#222222] text-sm hidden">OTP</P>
            </label>
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={5}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "56px",
                maxWidth: "56px",
                height: "56px",
                margin: "0 auto",
                fontSize: "3rem",
                borderRadius: "10px",
                border: "2px solid #D1AC42",
              }}
            />
            <Input
              type="hidden"
              {...register("oneTimePassword", {
                required: "Enter the OTP sent to you",
                minLength: {
                  value: 5,
                  message: "OTP must be 5 digits",
                },
                maxLength: {
                  value: 5,
                  message: "OTP must be 5 digits",
                },
              })}
            />
            {errors?.oneTimePassword && (
              <ErrorMessage
                message={errors.oneTimePassword.message?.toString()}
              />
            )}
          </div>

          <div className="mt-5">
            <Button
              className="w-full"
              title="Verify Code"
              type="submit"
              loading={isPerformingAuthAction}
            />
          </div>

          <p className="mt-4 md:text-center text-xs">
            Haven't got the SMS yet?{" "}
            <Link to="#" className="">
              <span className="text-[var(--primary-gold)] hover:underline ">
                Resend OTP
              </span>
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default NewPassword;
