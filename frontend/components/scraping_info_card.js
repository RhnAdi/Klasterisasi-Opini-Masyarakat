export default function ScrapingInfoCard({
  keyword,
  data,
  query,
  count,
  maxtweetnbr,
}) {
  return (
    <div class=" p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 w-full">
      <p>
        <p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {keyword}
        </p>
      </p>
      <ul class="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
        <li>Result : {count}</li>
        <li>Query : {query}</li>
        <li>Max Tweet Nbr : {maxtweetnbr}</li>
      </ul>
      <button class="mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Download
      </button>
    </div>
  );
}
