import React from "react";
import { useState } from "react";
import { fetchHolidays } from "../fetchHolidays";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [year, setYear] = useState(2025);
  const [country, setCountry] = useState("RO");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["holidays", year, country],
    queryFn: () => fetchHolidays(year, country),
    enabled: false,
  });
  return (
    <div>
      <select
        className="py-2 px-10 mr-2 rounded"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>

      <select
        className="py-2 px-10 rounded"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="RO">Romania </option>
        <option value="DE">Germany</option>
        <option value="UK">United Kingdom</option>
      </select>
      <button
        className="bg-cyan-500 py-2 px-6 ml-2 text-gray-500"
        onClick={refetch}
      >
        Fetch Holidays
      </button>

      {isLoading && <p className="text-gray-500 mt-4">Loading..</p>}
      {isError && <p className="text-red-500 mt-4">Something Wrong..</p>}

      {data && data.length > 0 && (
        <ul className="mt-6 space-y-2 mb-10">
          {data.map((holiday) => (
            <li key={holiday.id} className="border p-2 rounded shadow-sm">
              <p className="font-semibold">{holiday.name[0]?.text}</p>
              <p className="text-sm text-gray-600">{holiday.startDate}</p>
              <p className="text-xs text-gray-400">
                {holiday.nationwide ? "Nationwide" : "Regional"} –{" "}
                {holiday.regionalScope}
              </p>
            </li>
          ))}
        </ul>
      )}

      {data && data.length === 0 && (
        <p className="text-gray-500 mt-4">
          No holidays found for this country/year.
        </p>
      )}
    </div>
  );
}
