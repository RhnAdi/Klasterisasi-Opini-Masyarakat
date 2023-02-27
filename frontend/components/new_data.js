import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import AppContext from "../app/AppContext";

export default function NewData({
  loading,
  setLoading,
  setErrorStatus,
  setErrorMessage,
}) {
  const [isStemming, setIsStemming] = useState(false);
  const { state, reducer } = useContext(AppContext);
  const router = useRouter();
  async function _handleNewData() {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:8080/new_data`, {
        stemming: isStemming,
        stopword: state.stopword,
      });
      const data = res.data.Data;
      reducer.setPreprocessing(data.corpus);
      reducer.setTfidf(data.tfidf);
      reducer.setIsStemming(data.is_stemming);
      reducer.setScraping(data.scraping);
      reducer.setAction(true);
      reducer.setClustering(data.clustering);
      router.push("/dashboard");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrorStatus(true);
      setErrorMessage(err.response?.data.message);
    }
  }
  return (
    <div className="text-left block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        With Generate New Data
      </h5>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Generate a new dataset from twitter with the specified keywords.
      </p>

      <div className="flex items-center justify-between">
        <button
          disabled={loading}
          type="button"
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={_handleNewData}
        >
          Generate
        </button>
        <label
          htmlFor="new_data_stemming"
          className="inline-flex relative items-center cursor-pointer"
        >
          <input
            type="checkbox"
            value=""
            id="new_data_stemming"
            className="sr-only peer"
            onChange={() => setIsStemming(!isStemming)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Stemming
          </span>
        </label>
      </div>
    </div>
  );
}
