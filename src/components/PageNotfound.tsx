import { NavLink } from "react-router-dom"

export const PageNotfound = () => {
    return (
        <div className="min-h-[calc(100vh-110px)] flex flex-col justify-center items-center z-10">
            <h1 className="text-blue-600 tracking-tighter font-extrabold text-[4.5rem] leading-none mb-4">404</h1>
            <h2 className="text-gray-900 tracking-tighter font-bold text-3xl leading-[1.875rem] mb-4">Something's missing.</h2>
            <p className="text-gray-500 font-light text-lg leading-7 mb-4">
                Sorry, we can't find that page. You'll find lots to explore on the home page.
            </p>
            <NavLink to="/" className="bg-blue-600 text-white font-medium text-sm leading-5 text-center pt-2.5 pb-2.5 px-5 rounded-md mt-4 mb-4 inline-flex border-0">Back to Homepage</NavLink>
        </div>
    )
}
