import React, { useEffect, useState, useMemo } from "react";

import SelectController from "Common/Form/SelectController";
import { getLocalBodies } from "Apis/utilities";

function LocalBodyForm({ control, watch, setValue }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

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
        onChange={() => setValue("type", null)}
      />
      <SelectController
        control={control}
        name="type"
        label="Local Body Type"
        placeholder="Select Local Body Type"
        options={districtData}
        isLoading={loading}
        isDisabled={!watch("district")}
      />
    </>
  );
}

export default LocalBodyForm;
