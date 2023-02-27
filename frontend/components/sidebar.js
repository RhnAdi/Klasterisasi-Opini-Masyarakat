import Image from "next/image";
import DashboardIcon from "../icons/dashboard";
import FileIcon from "../icons/FileIcon";
import ChartIcon from "../icons/ChartIcon";
import TicketIcon from "../icons/TicketIcon";
import BarIcon from "../icons/BarIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();
  return (
    <sidebar className="flex flex-col p-4 gap-y-10 w-1/5 bg-slate-900 h-screen fixed shadow-lg shadow-slate-700">
      <Link
        href="/"
        className="cursor-pointer flex w-full bg-green gap-x-4 items-center px-3 py-3 bg-slate-800/75 rounded-lg"
      >
        <Image
          src="/univ_annur_icon.png"
          width={42}
          height={42}
          alt="logo"
          className="w-min h-min"
        />
        <p className="text-md text-gray-200 font-semibold">
          Universitas Annur Purwodadi
        </p>
      </Link>
      <div className="flex flex-col gap-y-4">
        <Link
          href="/dashboard"
          className="cursor-pointer flex gap-x-4 items-center group"
        >
          <div
            className={`${
              path == "/dashboard" ? "bg-blue-700" : "bg-slate-800/75"
            } group-hover:bg-blue-700 p-2 rounded-xl`}
          >
            <DashboardIcon
              height={24}
              width={24}
              className={
                path == "/dashboard"
                  ? "text-white"
                  : "" + "group-hover:text-white text-gray-400"
              }
            />
          </div>
          <p
            className={
              path == "/dashboard"
                ? "text-white"
                : "" + "text-gray-300 group-hover:text-white"
            }
          >
            Dashboard
          </p>
        </Link>
        <Link
          href="/dashboard/scraping"
          className="cursor-pointer flex gap-x-4 items-center group"
        >
          <div
            className={`${
              path == "/dashboard/scraping" ? "bg-blue-700" : "bg-slate-800/75"
            } group-hover:bg-blue-700 p-2 rounded-xl`}
          >
            <FileIcon
              height={24}
              width={24}
              className={
                path == "/dashboard/scraping"
                  ? "text-white"
                  : "" + "group-hover:text-white text-gray-400"
              }
            />
          </div>
          <p className="text-gray-300 group-hover:text-white">Scraping</p>
        </Link>
        <Link
          href="/dashboard/preprocessing"
          className="cursor-pointer flex gap-x-4 items-center group"
        >
          <div
            className={`${
              path == "/dashboard/preprocessing"
                ? "bg-blue-700"
                : "bg-slate-800/75"
            } group-hover:bg-blue-700 p-2 rounded-xl`}
          >
            <TicketIcon
              height={24}
              width={24}
              className={
                path == "/dashboard/preprocessing"
                  ? "text-white"
                  : "" + "group-hover:text-white text-gray-400"
              }
            />
          </div>
          <p className="text-gray-300 group-hover:text-white">Preprocesing</p>
        </Link>
        {/* <Link
          href="/dashboard/tfidf"
          className="cursor-pointer flex gap-x-4 items-center group"
        >
          <div
            className={`${
              path == "/dashboard/tfidf" ? "bg-blue-700" : "bg-slate-800/75"
            } group-hover:bg-blue-700 p-2 rounded-xl`}
          >
            <ArrowIcon
              height={24}
              width={24}
              className={
                path == "/dashboard/tfidf"
                  ? "text-white"
                  : "" + "group-hover:text-white text-gray-400"
              }
            />
          </div>
          <p className="text-gray-300 group-hover:text-white">TFIDF</p>
        </Link> */}
        <Link
          href="/dashboard/cluster"
          className="cursor-pointer flex gap-x-4 items-center group"
        >
          <div
            className={`${
              path.split("/")[1] == "dashboard" &&
              path.split("/")[2] == "cluster"
                ? "bg-blue-700"
                : "bg-slate-800/75"
            } group-hover:bg-blue-700 p-2 rounded-xl`}
          >
            <BarIcon
              height={24}
              width={24}
              className={
                path.split("/")[1] == "dashboard" &&
                path.split("/")[2] == "cluster"
                  ? "text-white"
                  : "" + "group-hover:text-white text-gray-400"
              }
            />
          </div>
          <p className="text-gray-300 group-hover:text-white">Cluster</p>
        </Link>
        <Link
          href="/dashboard/optimization"
          className="cursor-pointer flex gap-x-4 items-center group"
        >
          <div
            className={`${
              path == "/dashboard/optimization"
                ? "bg-blue-700"
                : "bg-slate-800/75"
            } group-hover:bg-blue-700 p-2 rounded-xl`}
          >
            <ChartIcon
              height={24}
              width={24}
              className={
                path == "/dashboard/optimization"
                  ? "text-white"
                  : "" + "group-hover:text-white text-gray-400"
              }
            />
          </div>
          <p className="text-gray-300 group-hover:text-white">Optimization</p>
        </Link>
      </div>
    </sidebar>
  );
}
