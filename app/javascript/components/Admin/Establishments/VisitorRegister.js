import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";

import { getEstablishmentRegister } from "Apis/Admin";
import Input from "Common/Form/Input";
import Button from "Common/Button";
import Table from "Common/Table";

const schema = yup.object().shape({
  from: yup
    .date()
    .typeError("Please enter valid date")
    .required("Please provide from date")
    .min(new Date(2019, 0, 1), "No data available before this date"),
  to: yup
    .date()
    .typeError("Please enter valid date")
    .required("Please provide to date")
    .when("from", (from, schema) => from && schema.min(from)),
});

const renderDate = (dateString) => {
  if (!dateString) {
    return null;
  }
  return dayjs(dateString).format("DD-MM-YYYY HH:mm");
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    className: "text-gray-900",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Age",
    dataIndex: "age",
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

function VisitorRegister() {
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [establishmentRegister, setEstablishmentRegister] = useState({});

  const getRegister = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const register = await getEstablishmentRegister({
        ...data,
        visitable_id: id,
      });
      setEstablishmentRegister(register);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const { visits } = establishmentRegister;

  return (
    <main className="px-8 py-6">
      <header>
        <div>
          <h2 className="text-3xl leading-12 font-extrabold text-gray-900">
            Visitor Register
          </h2>
          <Link to="/admin/establishments">
            <p className="text-sm text-indigo-400 leading-5 mt-1">
              ⇐ Back to establishment search
            </p>
          </Link>
        </div>
      </header>
      <div className="mt-8 rounded-sm bg-white">
        <form
          className="flex p-4 space-x-6"
          noValidate
          onSubmit={handleSubmit(getRegister)}
        >
          <Input
            name="from"
            label="From Date"
            required
            type="date"
            placeholder="Select Start Date"
            register={register}
            errors={errors}
            autoComplete="off"
          />
          <Input
            name="to"
            label="To Date"
            required
            type="date"
            placeholder="Select End Date"
            register={register}
            errors={errors}
            autoComplete="off"
          />
          <span className="self-center">
            <Button
              htmlType="submit"
              colorType="primary"
              sizeType="lg"
              className={"mt-6"}
              loading={loading}
            >
              Submit
            </Button>
          </span>
        </form>
        {error && <p>Could not find the establishment specified</p>}
      </div>
      <br />
      {visits &&
        (visits.length > 0 ? (
          <section>
            <h3 className="text-3xl leading-12 font-extrabold text-gray-900">
              Visitors details
            </h3>
            <div className="mt-6">
              <Table columns={columns} data={visits} dataKey="id" />
            </div>
          </section>
        ) : (
          <p className="text-2xl leading-12 font-extrabold text-gray-900">
            No visitors
          </p>
        ))}
    </main>
  );
}

export default VisitorRegister;
