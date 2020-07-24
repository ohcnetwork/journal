import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { getEstablishmentRegister } from "Apis/Admin";
import Input from "Common/Form/Input";
import Button from "Common/Button";
import Table from "Common/Table";

const schema = yup.object().shape({
  visitable_id: yup.string().trim().required("Please enter establishments ID"),

  from: yup
    .date()
    .typeError("Please enter valid date")
    .required("Please provide from date")
    .min(new Date(2019, 0, 1), "No data available before this date"),
  to: yup
    .date()
    .typeError("Please enter valid date")
    .required("Please provide to date")
    .min(new Date(2019, 0, 1), "No data available before this date"),
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
];

function Establishments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [establishmentRegister, setEstablishmentRegister] = useState({});
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const getRegister = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const register = await getEstablishmentRegister(data);
      setEstablishmentRegister(register);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const { visits } = establishmentRegister;

  const history = useHistory();
  const showListPage = ()=>{
    history.push('/admin/establishments/list');
  }
  return (
    <main className="px-8 py-6">
      <header>
        <div>
          <h2 className="text-3xl leading-12 font-extrabold text-gray-900">
            Establishment Register
          </h2>
            <p className="text-sm text-gray-500 leading-5 mt-1">
              Please enter establishment id to get the visitors details.
          </p>
        </div>
        <div>
          <Button
            htmlType="submit"
            colorType="primary"
            sizeType="lg"
            className={"mt-6"}
            onClick={()=>showListPage()}
          >
            List
            </Button>
        </div>
        
      </header>
      <div className="mt-8 rounded-sm bg-white">
        <form
          className="flex p-4 space-x-6"
          noValidate
          onSubmit={handleSubmit(getRegister)}
        >
          <Input
            name="visitable_id"
            label="Establishment Id"
            required
            placeholder="Establishment Id"
            register={register}
            errors={errors}
            autoComplete="off"
          />
          <Input
            name="from"
            label="From Date"
            required
            type="date"
            placeholder=""
            register={register}
            errors={errors}
            autoComplete="off"
          />
          <Input
            name="to"
            label="To Date"
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
              className={"mt-6"}
              loading={loading}
            >
              Submit
            </Button>
          </span>
        </form>
        {error && <p>Could not find the estaablishment specified</p>}
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

export default Establishments;
