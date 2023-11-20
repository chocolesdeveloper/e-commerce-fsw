import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-full animate-spin items-center justify-center">
      <Loader />
    </div>
  );
}
