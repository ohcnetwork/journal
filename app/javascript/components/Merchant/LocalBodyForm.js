import React, { useEffect, useState, useMemo } from "react";

import SelectController from "Common/Form/SelectController";
import { getLocalBodies } from "Apis/utilities";

/**
 * Select the local body using cascading form fields
 * District -> local body type -> local body.
 */
function LocalBodyForm({ form }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const { control, setValue } = form;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await getLocalBodies();
        setData(response.data);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const districtData = useMemo(() => {
    if (!data) {
      return [];
    }
    const { districts } = data;
    return Object.entries(districts).map(([value, label]) => ({
      label,
      value,
    }));
  }, [data]);

  return (
    <>
      <SelectController
        control={control}
        name="district"
        label="District"
        placeholder="Select District"
        options={districtData}
        isLoading={loading}
        onChange={(value) => {
          setValue("type", null);
          return value;
        }}
      />
      <LocalBodyType form={form} data={data?.data} />
      <LocalBody form={form} data={data?.data} />
    </>
  );
}

/**
 * Select local body type.
 * Types are to be retrieved from selected district data.
 */
function LocalBodyType({ form: { watch, control, setValue }, data }) {
  const districtId = watch("district")?.value;

  const bodyTypes = useMemo(() => {
    if (!districtId) {
      return [];
    }
    const types = data[districtId].types;
    return Object.entries(types).map(([, label]) => ({
      label,
      value: label,
    }));
  }, [districtId, data]);

  return (
    <SelectController
      control={control}
      name="type"
      label="Local Body Type"
      placeholder="Select Local Body Type"
      options={bodyTypes}
      isDisabled={!districtId}
      onChange={(value) => {
        setValue("local_body", null);
        return value;
      }}
    />
  );
}

function LocalBody({ form: { watch, control }, data }) {
  const districtId = watch("district")?.value;
  const typeId = watch("type")?.value;

  const localBodies = useMemo(() => {
    if (!(districtId && typeId)) {
      return [];
    }
    const bodiesList = data[districtId]["data"][typeId];
    return bodiesList.map(({ lb_code, lb_name_english }) => ({
      label: lb_name_english,
      value: lb_code,
    }));
  }, [data, districtId, typeId]);

  return (
    <SelectController
      control={control}
      name="local_body"
      label="Local Body"
      placeholder="Select Local Body"
      options={localBodies}
      isDisabled={!typeId}
    />
  );
}

export default LocalBodyForm;
