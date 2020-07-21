import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import dayjs from "dayjs";

import { getRouteMapOfUser } from "Apis/Admin";
import Input from "Common/Form/Input";
import Button from "Common/Button";
import Table from "Common/Table";

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

const renderDate = (dateString) => {
  if (!dateString) {
    return null;
  }
  return dayjs(dateString).format("DD-MM-YYYY HH:mm");
};

const columns = [
  {
    title: "Visitable Name",
    dataIndex: "visitable.name",
    className: "text-gray-900",
  },
  {
    title: "Visitable Address",
    dataIndex: "visitable.address",
  },
  {
    title: "Visitable Phone",
    dataIndex: "visitable.phone",
  },
  {
    title: "Entry",
    dataIndex: "entry_at",
    render: renderDate,
  },
  {
    title: "Exit",
    dataIndex: "exit_at",
    render: renderDate,
  },
];

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
        <section>
          <h3 className="text-3xl leading-12 font-extrabold text-gray-900">
            Places
          </h3>
          <Table columns={columns} data={visits} dataKey="id" />
        </section>
      )}
    </main>
  );
}

export default RouteMap;
