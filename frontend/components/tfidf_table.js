import AppContext from "../app/AppContext";
import { useContext } from "react";

export default function TFIDFTable() {
  const { state } = useContext(AppContext);
  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Document
              </th>
              {(() => {
                const arr = [];
                for (let i = 0; i < state.tfidf?.result[0].length; i++) {
                  arr.push(
                    <th scope="col" className="py-3 px-6">
                      {state.tfidf.sentence[i]}
                    </th>
                  );
                }
                return arr;
              })()}
            </tr>
          </thead>
          <tbody>
            {(() => {
              const arr = [];
              for (let i = 0; i < 10; i++) {
                const arr2 = [];
                for (let j = 0; j < state.tfidf?.result[i].length; j++) {
                  arr2.push(
                    <td className="py-4 px-6">
                      {state.tfidf.result[i][j].toFixed(2)}
                    </td>
                  );
                }
                arr.push(
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6">
                      {i + 1}
                    </th>
                    {arr2}
                  </tr>
                );
              }
              return arr;
            })()}
          </tbody>
        </table>
      </div>
      <div
        className="mt-2 flex py-2 px-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300"
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Alert !</span>
        <div>
          <span className="font-medium">Tips</span> only show 10 records because
          it will slow down the page.
        </div>
      </div>
    </>
  );
}
