import React, { useState } from "react";
import { getMerchants } from "Apis/Admin";

import Input from "Common/Form/Input";
import Button from "Common/Button";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [merchants, setMerchants] = useState([]); 
  const [districtId, setDistrictId] = useState(-1);
  const [search, setSearch] = useState(false);
  const loadData = async () => {
    setLoading(true);
    const response = await getMerchants({ districtId});
    if(response && response.merchants){
      setMerchants(response.merchants);
    }
    setLoading(false);
  }
  return (
    <main className="px-8 py-6">
      <header>
        <h2 className="text-3xl leading-12 font-extrabold text-gray-900">
          Establishments
        </h2>
      </header>
      <div class="flex flex-row">
        <Input
          name="district_id"
          label="District Id"
          required
          placeholder="District Id"
          onChange={(e) => setDistrictId(e.target.value)}
          // errors={errors}
          autoComplete="off"
        />
        <span className="self-center">
          <Button
            htmlType="submit"
            colorType="primary"
            sizeType="lg"
            className={"mt-6"}
            loading={loading}
            onClick={()=>{
              loadData();
              setSearch(true);
              }}
          >
            Submit
            </Button>
        </span>
      </div>
      { search && districtId > -1 && 
      (<section>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">District</th>
              <th className="px-4 py-2">LB Code</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Phone</th>

            </tr>
          </thead>
          <tbody>
            { merchants && merchants.map((merchant, index)=>{
              return (
                <tr key={index}>
                  <td className="border px-4 py-2">{merchant.name}</td>
                  <td className="border px-4 py-2">{merchant.district_name}</td>
                  <td className="border px-4 py-2">{merchant.lb_code}</td>
                  <td className="border px-4 py-2">{merchant.address}</td>
                  <td className="border px-4 py-2">{merchant.phone_number}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </section>)}
    </main>
  );
}

export default List;
