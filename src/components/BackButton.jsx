import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-sm text-blue-600 hover:underline mb-4"
    >
      <FiArrowLeft className="mr-1" /> Back
    </button>
  );
};


export default BackButton;