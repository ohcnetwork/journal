import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";

import { getMerchants } from "Apis/Admin";
import LocalBodyForm from "Common/LocalBodyForm";
import Button from "Common/Button";
import Table from "Common/Table";

const schema = yup.object().shape({
  local_body: yup.mixed().required("Please enter local body"),
});

const columns = [
  {
    title: "Merchant Name",
    dataIndex: "visitable.name",
    className: "text-gray-900",
  },
  {
    title: "Address",
    dataIndex: "visitable.address",
  },
  {
    title: "Phone",
    dataIndex: "visitable.phone",
  },
];

const List = () => {
  const form = useForm({
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = form;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [merchants, setMerchants] = useState([]);

  const loadMerchants = async (lbCode) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMerchants({ lbCode });
      if (response && response.merchants) {
        setMerchants(response.merchants);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormValues = (data) => {
    const {
      local_body: { value: localBodyId },
    } = data;
    loadMerchants(localBodyId);
  };

  return (
    <main className="px-8 py-6">
      <header>
        <h2 className="text-3xl leading-12 font-extrabold text-gray-900">
          Establishments
        </h2>
      </header>
      <form
        className="max-w-xl"
        noValidate
        onSubmit={handleSubmit(handleFormValues)}
      >
        <LocalBodyForm form={form} />
        <span className="block w-full rounded-md shadow-sm">
          <Button
            htmlType="submit"
            colorType="primary"
            sizeType="lg"
            loading={loading}
            block
          >
            Search
          </Button>
        </span>
      </form>
      <section className="mt-6">
        {loading && <p>Loading...</p>}
        {error && <p>Could not find merchant list. Please try again.</p>}
        {!error && !loading && <Table columns={columns} data={merchants} />}
      </section>
    </main>
  );
};

export default List;
