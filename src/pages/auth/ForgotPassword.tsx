import { FieldValues, useForm } from "react-hook-form";

import logo from "../../assets/logo/newLogoFull.svg";

import ErrorMessage from "../../components/inputs/ErrorMessage";
import { P } from "../../components/Texts";
import { Input } from "../../components/inputs/Input";
import Button from "../../components/Buttons";

import { forgotPasswordAPI } from "../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { isPerformingAuthAction } = useAppSelector(selectAuth);

  // Form Handler
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form Submission Handler
  const submit = ({ email }: FieldValues) => {
    dispatch(forgotPasswordAPI({ email }));
  };

  return (
    <main className="w-screen h-screen px-4 md:px-0 bg-[#FFFFFF] flex flex-col items-center justify-center">
      <div className="max-w-lg p-4 flex flex-col gap-2 justify-center items-center border-2 rounded-lg">
        <img src={logo} alt="Predictbeta" />
        <form
          onSubmit={handleSubmit(submit)}
          className="mt-10 md:min-w-[400px] md:w-1/3"
        >
          <div className="text-center">
            <h3 className="text-xl text-[#222222] font-semibold mb-4">
              Forgot password?
            </h3>
            <p className="text-[#929292] mb-8 text-[14px] ">
              Please enter your Phone number or username <br /> to reset the
              password
            </p>
          </div>

          {/* Email */}
          <div className="mt-5">
            <label htmlFor="email" className="mb-2 block">
              <P className="text-[#222222] text-sm">Phone number or Username</P>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your phone number or username"
              {...register("email", {
                required: "Enter a valid email",
              })}
              className={`w-full input ${errors?.email ? "invalid" : ""}`}
            />
            {errors?.email && (
              <ErrorMessage message={errors.email.message?.toString()} />
            )}
          </div>

          <div className="mt-5">
            <Button
              className="w-full"
              title="Request password reset"
              type="submit"
              loading={isPerformingAuthAction}
            />
          </div>

          <p className="mt-4 md:text-center text-xs">
            Remember your password?{" "}
            <Link to="/login" className="">
              <span className="text-[var(--primary-gold)] hover:underline ">
                Back to Log in
              </span>
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
