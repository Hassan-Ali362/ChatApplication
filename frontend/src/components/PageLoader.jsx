import { LoaderIcon } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderIcon className="animate-spin ml-2" size={24} />
    </div>
  );
};
