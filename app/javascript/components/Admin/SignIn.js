import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import * as AdminAuthApi from "Apis/Admin/Auth";
import Input from "Common/Form/Input";
import Button from "Common/Button";

const schema = yup.object().shape({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

function SignIn() {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AdminAuthApi.signIn(payload);
      const authToken = response.data.auth_token;
      localStorage.setItem("admin-auth-token", authToken);
      history.push("/admin");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-4">
          <h2 className="text-3xl leading-9 font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <div className="px-6 py-4 bg-white shadow-sm">
          <div className="mt-6">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Input
                name="username"
                label="Username"
                required
                placeholder="username"
                register={register}
                errors={errors}
                autoComplete="username"
              />
              <Input
                name="password"
                label="Password"
                required
                type="password"
                placeholder="******"
                register={register}
                errors={errors}
                autoComplete="current-password"
              />
              {error && (
                <div className="mt-1 text-red-600 text-center" role="alert">
                  <p>Invalid Username/Password. Please try again.</p>
                </div>
              )}
              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <Button
                    htmlType="submit"
                    colorType="primary"
                    sizeType="lg"
                    block
                    loading={loading}
                  >
                    LOGIN
                  </Button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
