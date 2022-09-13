export default function Skeleton() {
  return (
    <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
      <div className="c-card block bg-amber-50 shadow-md hover:shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-1 gap-5 sm:p-2">
          <div className="flex flex-1 flex-col gap-3">
            <div className="bg-gray-200 w-full animate-pulse h-32 rounded-2xl"></div>
            <div className="bg-gray-200 w-1/2 animate-pulse h-3 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
            <div className="bg-gray-200 w-1/4 animate-pulse h-3 rounded-2xl"></div>
          </div>
          <div className="flex justify-center w-full">
            <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
