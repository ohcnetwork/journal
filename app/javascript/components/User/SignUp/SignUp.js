import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (payload) => {
    setLoading(true);
    try {
      const response = await login(payload);
      if (response.data?.user) {
        history.push("/scan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-sm">
        <img className="w-full" src={SignUpThump} alt="" />
        <div className="px-6 py-4">
          <h2 className="text-3xl leading-9 font-extrabold text-gray-900">
            Sign Up
          </h2>
          <div className="mt-6">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Input
                name="name"
                label="Full Name"
                required
                placeholder="John Doe"
                register={register}
                errors={errors}
                autoComplete="name"
              />
              <Input
                name="phone_number"
                label="Mobile number"
                required
                placeholder="10 digit mobile number"
                register={register}
                errors={errors}
                autoComplete="tel"
              />
              <Input
                name="date_of_birth"
                label="Date of Birth"
                required
                type="date"
                placeholder=""
                register={register}
                errors={errors}
                autoComplete="bday"
              />
              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <Button
                    htmlType="submit"
                    colorType="primary"
                    sizeType="lg"
                    block
                    loading={loading}
                  >
                    Sign Up
                  </Button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <SignUpOtp />
      </div>
    </div>
  );
}

export default SignUp;
