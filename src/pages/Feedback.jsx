import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { submitFeedback } from "../apis/map.api";

function Feedback() {
  const { state } = useLocation();
  const { rideDetails } = state || {};
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!rideDetails) {
      navigate("/");
    }
  }, [rideDetails, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Please provide a rating.");
      return;
    }

    try {
      await submitFeedback({
        rideId: rideDetails._id,
        feedback: { rating, comment },
      });
      setSubmitted(true);
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  if (!rideDetails) return null;

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((val) => (
      <span
        key={val}
        onClick={() => setRating(val)}
        className={`cursor-pointer text-3xl ${
          val <= rating ? "text-yellow-400" : "text-gray-400"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopBar />
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Ride Feedback
          </h2>
          <p className="text-gray-600 mb-4">
            How was your ride with{" "}
            <span className="font-medium">
              {rideDetails?.captain?.fullname?.firstname || "the driver"}
            </span>
            ?
          </p>

          <div className="flex justify-center mb-4">{renderStars()}</div>

          <textarea
            placeholder="Leave a comment (optional)"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 resize-none"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition"
            disabled={submitted}
          >
            {submitted ? "Thank you!" : "Submit Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;


