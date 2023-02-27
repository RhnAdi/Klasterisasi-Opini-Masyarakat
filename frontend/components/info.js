export default function Info({ keyword, count }) {
  return (
    <div className="bg-slate-900 rounded-lg p-4 w-full flex gap-x-4 justify-between items-center border border-slate-700 shadow-md">
      <div>
        <p className="text-gray-400 text-sm">Title</p>
        <p className="text-gray-200">{keyword}</p>
      </div>
      <div>
        <p className="text-gray-400 text-sm">Count</p>
        <p className="text-gray-200">{count}</p>
      </div>
    </div>
  );
}
