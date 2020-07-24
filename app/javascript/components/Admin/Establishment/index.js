import React, { useState, useEffect } from "react";

import { getMerchants } from "Apis/Admin";

const Establishment = () => {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    loadData();
  },[]);

  const loadData = async () => {
    const districtId = 13;
    const response = await getMerchants({ districtId});
    console.log('response:',response);
    setLoading(false);
  }
  return (
    <main className="px-8 py-6">
      <header>
        <h2 className="text-3xl leading-12 font-extrabold text-gray-900">
          Establishments
        </h2>
      </header>
      <section>
        <table className="table-auto ">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Views</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Intro to CSS</td>
              <td className="border px-4 py-2">Adam</td>
              <td className="border px-4 py-2">858</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2">A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
              <td className="border px-4 py-2">Adam</td>
              <td className="border px-4 py-2">112</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Intro to JavaScript</td>
              <td className="border px-4 py-2">Chris</td>
              <td className="border px-4 py-2">1,280</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Establishment;
