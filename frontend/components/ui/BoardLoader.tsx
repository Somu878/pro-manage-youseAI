import { Loader2 } from "lucide-react";

export default function BoardLoader(){
    return(
        <div className="flex justify-center items-center h-[60vh]">
            <Loader2 className="h-10 w-10 animate-spin" />
        </div>
    )
}