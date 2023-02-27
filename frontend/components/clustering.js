import AppContext from "../app/AppContext";
import { useContext } from "react";
import Arrow2Icon from "../icons/Arrow2Icon";
import Link from "next/link";

export default function Clustering() {
  const { state } = useContext(AppContext);
  return (
    <div className="grid grid-cols-3 gap-4">
      {state.clustering?.kmeans.membership.map((_, idx) => {
        return (
          <Link
            key={idx}
            href={`/dashboard/cluster/${idx + 1}/`}
            className="py-3 px-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex justify-between"
          >
            <h5 className="text-lg font-semibold tracking-tight text-gray-700 dark:text-white">
              Cluster {idx + 1}
            </h5>
            <Arrow2Icon className="text-gray-700" height={24} width={24} />
          </Link>
        );
      })}
    </div>
  );
}
