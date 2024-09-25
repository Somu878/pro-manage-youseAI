
import AuthComponent from "@/components/core/AuthComponent";

// protect this route to not be accessed by unauthenticated users
function Page() {
  return (
    <div className="flex justify-center items-center h-screen  bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-zinc-900">
      {/*Banner*/}
<AuthComponent />
    </div>
  );
}

export default Page;