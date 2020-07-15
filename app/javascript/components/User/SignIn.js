import React from "react";
import { useForm } from "react-hook-form";

import Input from "../Common/Form/Input";
import { login } from "../../apis/Auth";

function SignIn() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async data => {
    await login(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 md:w-1/2 lg:w-1/3 container mx-auto"
    >
      <Input
        id="id"
        name="name"
        type="text"
        label="Name"
        register={register({ required: true })}
        required
      />

      <Input
        id="phone-number"
        name="phone_number"
        type="text"
        label="Phone Number"
        register={register({ required: true })}
        required
      />

      <Input
        id="date-of-birth"
        name="date_of_birth"
        type="text"
        label="Date of Birth"
        register={register({ required: true })}
        required
      />

      <input type="submit" className="block h-10 w-full my-2 cursor-pointer" />
    </form>
  );
}

export default SignIn;
