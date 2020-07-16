import React, { useEffect, useState } from "react";

import { userOngoingVisits } from "Apis/visits";
import VisitCard from "./VisitCard";

function Content() {
  const [loading, setLoading] = useState(false);
  const [onGoingVisits, setOnGoingVisits] = useState([]);

  useEffect(() => {
    const getOnGoingVisits = async () => {
      try {
        setLoading(true);
        const response = await userOngoingVisits();
        setOnGoingVisits(response.data.visits);
      } finally {
        setLoading(false);
      }
    };

    getOnGoingVisits();
  }, []);
  console.log(loading);
  return (
    <main className="px-3 py-1">
      <section>
        <h2 className="mt-6 text-2xl leading-8 font-extrabold text-gray-900">
          Ongoing Visits
        </h2>
        <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
          These are visits that you have currently started. Press exit button to
          end these visits.
        </p>
        <div className="my-2">
          {onGoingVisits.map((visit) => {
            return <VisitCard key={visit.id} data={visit} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default Content;
