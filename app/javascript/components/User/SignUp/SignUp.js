import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useHistory, useRouteMatch, Route, Link } from "react-router-dom";
import { isLoggedIn } from "Apis/authentication";

import Input from "Common/Form/Input";
import Button from "Common/Button";
import { login } from "Apis/authentication";
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
  const [verifyingLogin, setVerifyingLogin] = useState(false);
  const match = useRouteMatch();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function userLoggedIn() {
      setVerifyingLogin(true);
      const loginStatus = await isLoggedIn();
      if (loginStatus) {
        history.push("/user");
      }
      setVerifyingLogin(false);
    }
    userLoggedIn();
  }, []);

  const onSubmit = async (payload) => {
    setLoading(true);
    try {
      const response = await login(payload);
      const userId = response.data?.user_id;
      const mobileNumber = payload.phone_number;
      if (userId) {
        history.push(`${match.url}verify?id=${userId}&mobile=${mobileNumber}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (verifyingLogin) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center md:py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-sm">
        <img className="w-full" src={SignUpThump} alt="" />
        <div className="px-6 py-4">
          <Route path={`${match.url}`} exact>
            <>
              <h2 className="text-3xl leading-9 font-extrabold text-gray-900">
                Enter your details
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
                    autoFocus
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
            </>
          </Route>
          <Route path={`${match.url}verify`}>
            <div className="mt-2">
              <SignUpOtp />
            </div>
          </Route>
        </div>
      </div>
      <Link to="/merchant">
        <p className="mt-2 mb-4 text-gray-600 text-center">
          Are you looking for the Merchant Page?
        </p>
      </Link>
    </div>
  );
}

export default SignUp;
