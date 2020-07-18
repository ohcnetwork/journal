import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import Input from "Common/Form/Input";
import Button from "Common/Button";

const schema = yup.object().shape({
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

function RouteMap() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const getRouteMap = (data) => {
    console.log(data);
  };

  return (
    <main className="px-8 py-6">
      <header>
        <h2 className="text-3xl leading-12 font-extrabold text-gray-900">
          Route Map
        </h2>
        <p className="text-sm text-gray-500 leading-5 mt-1">
          Please enter date of birth and phone number of the person you want to
          generate route map for.
        </p>
      </header>
      <div className="mt-8 rounded-sm bg-white">
        <form
          className="flex p-4 space-x-6"
          noValidate
          onSubmit={handleSubmit(getRouteMap)}
        >
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
          <span className="self-center">
            <Button htmlType="submit" colorType="primary" sizeType="lg">
              Submit
            </Button>
          </span>
        </form>
      </div>
    </main>
  );
}

export default RouteMap;
