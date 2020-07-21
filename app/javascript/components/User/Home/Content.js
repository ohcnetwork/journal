import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { userOngoingVisits } from "Apis/visits";
import Button from "components/Common/Button";
import VisitCard from "./VisitCard";

function Content() {
  const [loading, setLoading] = useState(false);
  const [onGoingVisits, setOnGoingVisits] = useState([]);

  const getOnGoingVisits = async () => {
    try {
      setLoading(true);
      const response = await userOngoingVisits();
      setOnGoingVisits(response.data.visits);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOnGoingVisits();
  }, []);

  return (
    <main className="py-1">
      <section className="px-4 mt-4">
        <header>
          <h2 className="mt-6 text-xl leading-6 font-medium text-gray-800">
            Start a Visit
          </h2>
          <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
            Whenever you come across a Journal QR code in a shop/marketplace,
            press the button to scan QR code and mark your visit.
          </p>
        </header>
        <div className="mt-5">
          <Button block colorType="primary" size="lg" as={Link} to="/user/scan">
            Scan QR Code
          </Button>
        </div>
      </section>
      <section className="mt-6 py-2 px-4">
        <header>
          <h2 className="mt-6 text-xl leading-6 font-medium text-gray-800">
            Ongoing Visits
          </h2>
          <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
            These are visits that you have currently started. Press exit button
            to end these visits.
          </p>
        </header>
        <ul className="mt-4 mb-2 divide-y divide-gray-200">
          {onGoingVisits.map((visit) => {
            return (
              <VisitCard
                key={visit.id}
                data={visit}
                refetch={getOnGoingVisits}
              />
            );
          })}
          {loading && <p></p>}
          {!loading && onGoingVisits.length === 0 && (
            <p className="text-center mt-8 my-2 text-gray-500">
              You don&apos;t have any visits in progress.
            </p>
          )}
        </ul>
      </section>
    </main>
  );
}

export default Content;
