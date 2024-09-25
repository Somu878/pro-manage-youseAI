export default function ButtonLoader(

)
 {
    return (
        <div className="flex items-center justify-center">
            <div className="spinner-border 
        animate-spin
            inline-block w-6  h-6 border-2 border-t-white border-b-transparent border-r-transparent border-l-transparent rounded-full" role="status">
                {/* <span className="visually-hidden">Loading...</span> */}
            </div>
        </div>
    )
}

