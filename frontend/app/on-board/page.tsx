import AuthComponent from "@/components/core/AuthComponent";
import Image from "next/image";

function Page() {
  return (
    <div className="flex min-h-screen">
      {/*Banner*/}
      <div className="hidden lg:flex lg:w-3/5  items-center justify-center p-5 bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-90">
      {/* <div className="flex self-start">
      <Image src="/Board.svg" alt="Board" width={20} height={20} />
      </div> */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Pro Manage</h1>
          <p className="text-xl text-gray-300">Streamline your work with our powerful task management tool.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 ">
      {/* Auth Comopnent */}
        <AuthComponent />
      </div>
    </div>
  );
}

export default Page;