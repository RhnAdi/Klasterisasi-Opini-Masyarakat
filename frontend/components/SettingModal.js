import { useContext, useState } from "react";
import AppContext from "../app/AppContext";

export default function SettingModal({ setShowSetting }) {
  const { state, reducer } = useContext(AppContext);
  const [stopword, setStopword] = useState(state.stopword.join(" "));
  const _handleSave = () => {
    const raw_sw = stopword.replace(/\s/gm, " ");
    const p_sw = raw_sw.split(" ");
    reducer.setStopword(p_sw);
    setShowSetting(false);
  };
  const _handleClose = () => {
    setShowSetting(false);
  };
  return (
    <div className="absolute z-10 px-4 w-screen h-screen flex pt-16 justify-center bg-gray-200/50">
      <div className="bg-white shadow-md rounded-lg w-full md:w-2/3 lg:w-1/2 h-min flex-col p-4">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-lg font-bold text-gray-800">Settings</h1>
          <button onClick={_handleClose}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <label
            htmlFor="stopword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Stopword
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add stopwords ..."
            onChange={(e) => setStopword(e.target.value)}
            value={stopword}
          ></textarea>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={_handleSave}
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
