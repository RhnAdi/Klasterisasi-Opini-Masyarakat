import AppContext from "../app/AppContext";
import { useContext } from "react";
import Link from "next/link";

export default function PraprocesingTable() {
  const { state } = useContext(AppContext);
  return (
    <>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                No
              </th>
              <th scope="col" className="py-3 px-6">
                Document
              </th>
            </tr>
          </thead>
          <tbody>
            {state.preprocessing.slice(0, 10).map((item, idx) => {
              return (
                <tr
                  key={idx}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th scope="row" className="py-4 px-6">
                    {idx + 1}
                  </th>
                  <td className="py-4 px-6">{item}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <span className="w-full text-sm py-4 px-6 text-blue-400 text-center font-bold">
          <Link href="/dashboard/preprocessing">View All</Link>
        </span>
      </div>
    </>
  );
}
