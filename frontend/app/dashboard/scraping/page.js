"use client";

import ScrapingInfoCard from "../../../components/scraping_info_card";
import AppContext from "../../AppContext";
import { useContext } from "react";

export default function Scraping() {
  const { state } = useContext(AppContext);
  return (
    <div className="my-10 grid grid-cols-2 gap-4">
      {state.scraping?.map((item, idx) => {
        return (
          <ScrapingInfoCard
            key={idx}
            keyword={item.keyword}
            count={item.count}
            query={item.query}
            maxtweetnbr={item.maxtweetnbr}
            data={item.data}
          />
        );
      })}
    </div>
  );
}
