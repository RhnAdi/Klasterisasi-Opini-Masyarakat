"use client";

import NewData from "../components/new_data";
import { useState } from "react";
import ExistData from "../components/exist_data";
import SettingModal from "../components/SettingModal";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSetting, setShowSetting] = useState(false);
  return (
    <div className="overflow-hidden">
      {loading ? (
        <div className="absolute z-10 w-screen h-screen flex items-center justify-center bg-gray-200/50">
          <div className="bg-white shadow-md flex items-center justify-center rounded-lg w-64 h-64 flex-col p-4">
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-0 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <p className="text-center mt-5 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              Please wait. It may take a little longer ...
            </p>
          </div>
        </div>
      ) : null}
      {showSetting ? <SettingModal setShowSetting={setShowSetting} /> : null}
      <div className="px-12 py-10">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">
              Penelitian Skema PDP Tahun 2022
            </h3>
            <h3 className="text-xl font-bold">Universitas Annur Purwodadi</h3>
          </div>
          <button
            className="text-gray-800"
            onClick={() => setShowSetting(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
          <ExistData
            loading={loading}
            setLoading={setLoading}
            setErrorStatus={setErrorStatus}
            setErrorMessage={setErrorMessage}
          />
          <NewData
            loading={loading}
            setLoading={setLoading}
            setErrorStatus={setErrorStatus}
            setErrorMessage={setErrorMessage}
          />
        </div>
        {errorStatus ? (
          <div>
            <div
              id="alert-2"
              className="h-min flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Info</span>
              <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                <p className="font-semibold underline hover:text-red-800 dark:hover:text-red-900">
                  Error Message
                </p>
                . {errorMessage}.
              </div>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
                data-dismiss-target="#alert-2"
                aria-label="Close"
                onClick={() => setErrorStatus(false)}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
