import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import { getRouteMapOfUser } from "Apis/Admin";
import Input from "Common/Form/Input";
import Button from "Common/Button";
import dayjs from "dayjs";

const schema = yup.object().shape({
  phone_number: yup
    .string()
    .trim()
    .required("Please enter mobile number")
    .length(10, "Please enter 10 digit mobile number"),
  date_of_birth: yup
    .date()
    .typeError("Please enter valid date")
    .required("Please enter date of birth")
    .max(new Date(2010, 0, 1), "User should be at least 10 years old."),
});

function RouteMap() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visits, setVisits] = useState([]);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const getRouteMap = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const visitData = await getRouteMapOfUser(data);
      setVisits(visitData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
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
            autoComplete="off"
          />
          <Input
            name="date_of_birth"
            label="Date of Birth"
            required
            type="date"
            placeholder=""
            register={register}
            errors={errors}
            autoComplete="off"
          />
          <span className="self-center">
            <Button
              htmlType="submit"
              colorType="primary"
              sizeType="lg"
              loading={loading}
            >
              Submit
            </Button>
          </span>
        </form>
        {error && <p>Could not find the user specified</p>}
      </div>
      <br />
      {visits && visits.length > 0 && (
        <h3 className="text-3xl leading-12 font-extrabold text-gray-900">
          Places
        </h3>
      )}
      <section>
        {visits.map((visit) => {
          return <VisitCard key={visit.id} data={visit} />;
        })}
      </section>
    </main>
  );
}

function VisitCard({ data }) {
  return (
    <li className="py-2 flex items-center justify-between rounded-md">
      <div className="truncate">
        <h3 className="font-medium leading-8 text-gray-900 text-base">
          {data.visitable.name}
        </h3>
        <p className="font-medium leading-5 text-gray-600 text-sm truncate">
          {data.visitable.address}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          {dayjs().to(dayjs(data.entry_at))}
        </p>
      </div>
    </li>
  );
}

export default RouteMap;
