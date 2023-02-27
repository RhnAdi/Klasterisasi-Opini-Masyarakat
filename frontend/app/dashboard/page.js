"use client";

import Clustering from "../../components/clustering";
import Info from "../../components/info";
import PraprocesingTable from "../../components/praprocesing_table";
import TFIDFTable from "../../components/tfidf_table";
import AppContext from "../AppContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { state } = useContext(AppContext);
  const router = useRouter();
  console.log(state);
  useEffect(() => {
    if (!state.action) {
      router.push("/");
    }
  });
  return (
    <>
      <div>
        <p className="text-gray-700 font-bold my-4">Scraping</p>
        <div className="grid grid-cols-3 gap-2">
          {state.scraping.map((info, idx) => {
            return <Info key={idx} keyword={info.keyword} count={info.count} />;
          })}
        </div>
      </div>
      <div className="my-6">
        <p className="text-gray-700 font-bold my-4">Preprocessing</p>
        <PraprocesingTable />
      </div>
      {/* <div className="my-6">
        <p className="text-gray-700 font-bold my-4">TFIDF</p>
        <TFIDFTable />
      </div> */}
      <div className="my-6">
        <p className="text-gray-700 font-bold my-4">Clustering</p>
        <Clustering />
      </div>
    </>
  );
}
