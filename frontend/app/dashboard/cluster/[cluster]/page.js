"use client";

import AppContext from "../../../AppContext";
import { useContext, useState } from "react";
import ArrowNarrowLeftIcon from "../../../../icons/ArrowNarrowLeftIcon";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { state } = useContext(AppContext);
  const { cluster } = params;
  const [activePage, setActivePage] = useState(1);
  const router = useRouter();

  return (
    <div className="my-5">
      <button
        type="button"
        class="text-slate-900 hover:text-white border border-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2 dark:border-slate-600 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-800 flex gap-x-1 flex items-center"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowNarrowLeftIcon className="w-4 h-4" />
        <span className="text-sm font-semibold">Back</span>
      </button>
      <div className="overflow-x-auto relative mt-5">
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
            {state.clustering?.kmeans.membership[cluster - 1]
              .slice((activePage - 1) * 25, (activePage - 1) * 25 + 25)
              .map((item, idx) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6">
                      {idx + (activePage - 1) * 25 + 1}
                    </th>
                    <td className="py-4 px-6">{state.preprocessing[item]}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <nav
          class="flex justify-between items-center pt-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Result
            <span class="font-semibold text-gray-900 dark:text-white">
              {state.clustering?.kmeans.membership
                ? " " + state.clustering?.kmeans.membership[cluster - 1].length
                : " 0"}
            </span>
          </span>
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <button
                disabled={activePage == 1 ? true : false}
                onClick={() => setActivePage(activePage - 1)}
                class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            {/* {html_page()} */}
            <li>
              <button
                disabled={
                  activePage ==
                  Math.ceil(
                    state.clustering?.kmeans?.membership[cluster - 1].length /
                      25
                  )
                    ? true
                    : false
                }
                onClick={() => setActivePage(activePage + 1)}
                class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
