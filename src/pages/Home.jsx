import React from "react";
import { useState } from "react";
import { fetchHolidays } from "../fetchHolidays";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [year, setYear] = useState(2025);
  const [country, setCountry] = useState("RO");
  const [open, setOpen] = useState([]);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["holidays", year, country],
    queryFn: () => fetchHolidays(year, country),
    enabled: false,
  });

  const faqs = [
    {
      question: "What is this app about?",
      answer:
        "It's a fast and modern tool to check public holidays in your country.",
    },
    {
      question: "Is it free to use?",
      answer: "Yes, 100% free. No login or subscription required.",
    },
    {
      question: "Can I use it for any country?",
      answer: "We support over 100 countries via a public API.",
    },
    {
      question: "Can I contribute?",
      answer: "The app is open-source. You can contribute on GitHub.",
    },
  ];

  const toggleItem = (index) => {
    if (open.includes(index)) {
      setOpen(open.filter((i) => i !== index));
    } else {
      setOpen([...open, index]);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="max-w-xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        {faqs.map((item, index) => (
          <div key={index} className="border-b py-4">
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left font-medium text-lg flex justify-between items-center"
            >
              {item.question}
              <span>{open.includes(index) ? "−" : "+"}</span>
            </button>
            {open.includes(index) && (
              <p className="mt-2 text-gray-600">{item.answer}</p>
            )}
          </div>
        ))}
      </div>

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
