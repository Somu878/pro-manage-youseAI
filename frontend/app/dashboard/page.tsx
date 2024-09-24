"use client"
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function page() {
    const router = useRouter();
    return <div>Hello
      <Button variant="outline" onClick={() => {
        deleteCookie("token")
        router.push("/on-board")
      }}>Click me</Button>
    </div>;
  }
  