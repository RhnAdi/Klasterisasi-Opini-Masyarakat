import Container from "./container";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="bg-slate-100 h-16 flex items-center w-full justify-center">
      <Container>
        <div className="w-full flex justify-between items-center">
          <p>Penelitian PDP 2022</p>
          <div className="flex items-center justify-center">
            <button
              onClick={() => router.push("/")}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              + New Analysis
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
