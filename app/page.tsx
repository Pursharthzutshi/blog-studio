import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <h1 className="text-2xl font-bold">Welcome to the Blog</h1>
      <p className="mt-4">Please use the navigation bar above to explore.</p>
    </div>
  );
}
