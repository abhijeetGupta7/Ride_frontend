import { CgProfile } from "react-icons/cg";

const TopBar = () => {
    return (
        <>
            {/* Top Bar */}
            <div className="absolute top-5 left-0 w-full px-5 z-10 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black"> Ridee </h1>
            <CgProfile className="text-3xl text-gray-700 cursor-pointer"/>
            </div>
        </>
    )
}

export default TopBar;