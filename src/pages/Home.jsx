import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>

        {/* bg image */}
        <div className='h-screen w-full flex flex-col items-center justify-between bg-[url(/Home.jpg)] bg-cover bg-no-repeat bg-center' >
            
            {/* title */}
            <h1 className='text-6xl font-bold text-white pt-5 tracking-widest'> Ridee </h1>

            {/* Getting Started with continue button */}                
            <div className="bg-white w-full flex flex-col items-center justify-center px-7 rounded-t-2xl shadow-lg">
                <h1 className="text-black text-3xl font-bold my-3 text-center">Get started with Ridee</h1>
            
                <Link to="/login" className="w-full mb-3">
                    <button className="bg-black text-white w-full py-3 rounded-xl mb-2 text-xl hover:bg-gray-800 transition hover:scale-102 duration-200">
                        Continue
                    </button>
                </Link>
            </div>

        </div>

    </div>
  )
}

export default Home;
