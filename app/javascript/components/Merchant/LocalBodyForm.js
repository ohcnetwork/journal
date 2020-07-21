import React from "react";

import SelectController from "Common/Form/SelectController";

function LocalBodyForm({ control }) {
  return (
    <>
      <SelectController
        control={control}
        name="district"
        label="District"
        placeholder="Select District"
        options={[]}
      />
    </>
  );
}

export default LocalBodyForm;
