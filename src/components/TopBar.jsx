import { CgProfile } from "react-icons/cg";

const TopBar = () => {
    return (
        <>
            {/* Top Bar */}
            <div className="absolute top-5 left-0 w-full px-5 z-10 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-white"> Ridee </h1>
            <CgProfile className="text-4xl text-white cursor-pointer"/>
            </div>
        </>
    )
}

export default TopBar;