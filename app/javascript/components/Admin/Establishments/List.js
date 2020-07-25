import React, { useState, useEffect } from "react";
import { getMerchants, getLocalBodies } from "Apis/Admin";

import Input from "Common/Form/Input";
import Button from "Common/Button";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [merchants, setMerchants] = useState([]);
  const [districtId, setDistrictId] = useState(-1);
  const [search, setSearch] = useState(false);
  const [districts, setDistricts] = useState({});
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await getLocalBodies();
    if (response && response.districts) {
      setDistricts(response.districts);
    }
  };

  const loadMerchants = async () => {
    setLoading(true);
    const response = await getMerchants({ districtId });
    if (response && response.merchants) {
      setMerchants(response.merchants);
    }
    setLoading(false);
  };

  const handleSelectChange = (value) => {
    setDistrictId(value);
  };
  return (
    <main className="px-8 py-6">
      <header>
        <h2 className="text-3xl leading-12 font-extrabold text-gray-900">
          Establishments
        </h2>
      </header>
      <div className="flex flex-row">
        <select onChange={(e) => handleSelectChange(e.target.value)} value={districtId} className="inline-flex block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          <option key={-1} value={-1}>{'--Select--'}</option>
          {Object.keys(districts).map((id, index) => {
            return (<option key={index} value={id}>{districts[id]}</option>);
          })}
        </select>

        <span className="self-center">
          <Button
            htmlType="submit"
            colorType="primary"
            sizeType="lg"
            className={"mt-6 ml-3"}
            loading={loading}
            onClick={() => {
              loadMerchants();
              setSearch(true);
            }}
          >
            Submit
            </Button>
        </span>
      </div>
      {search && districtId > -1 &&
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
              {merchants && merchants.map((merchant, index) => {
                return (
                  <tr key={index}>
                    <td className="border px-4 py-2">{merchant.name}</td>
                    <td className="border px-4 py-2">{merchant.district_name}</td>
                    <td className="border px-4 py-2">{merchant.lb_code}</td>
                    <td className="border px-4 py-2">{merchant.address}</td>
                    <td className="border px-4 py-2">{merchant.phone_number}</td>
                  </tr>
                );
              })
              }
            </tbody>
          </table>
        </section>)}
    </main>
  );
};

export default List;
