import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import Input from "Common/Form/Input";
import Button from "Common/Button";
import { login } from "Apis/Auth";
import SignUpOtp from "./SignUpOtp";
import SignUpThump from "./signUpThump.jpg";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  phone_number: yup
    .string()
    .trim()
    .required("Please enter mobile number")
    .length(10, "Please enter 10 digit mobile number"),
  date_of_birth: yup
    .date("Please enter valid date")
    .required("Please enter date of birth")
    .max(new Date(2010, 0, 1)),
});

function SignUp() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full h-64" src={SignUpThump} alt="" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Sign Up</div>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="name"
              label="Full Name"
              required
              placeholder="John Doe"
              register={register}
              errors={errors}
            />
            <Input
              name="phone_number"
              label="Mobile number"
              required
              placeholder="10 digit mobile number"
              register={register}
              errors={errors}
            />
            <Input
              name="date_of_birth"
              label="Date of Birth"
              required
              type="date"
              placeholder=""
              register={register}
              errors={errors}
            />
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <Button
                  htmlType="submit"
                  colorType="primary"
                  sizeType="lg"
                  block
                >
                  Sign Up
                </Button>
              </span>
            </div>
          </form>
        </div>
        <SignUpOtp />
      </div>
    </div>
  );
}

export default SignUp;
