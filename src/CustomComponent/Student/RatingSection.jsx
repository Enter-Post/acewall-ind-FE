import React, { useState } from "react";
import RatingStars from "../RatingStars";
import { Star } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { toast } from "sonner";

const RatingSection = ({ course, id }) => {
  const [userRating, setUserRating] = useState(0);

  console.log(userRating, "userRating");

  const handleRatingSubmit = async (rating) => {
    await axiosInstance
      .post(`/rating/create/${id}`, {
        star: rating,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });

    setUserRating(rating);
  };

//   const averageRating =
//     course.rating && course.rating.length > 0
//       ? course.rating.reduce((sum, r) => sum + r.value, 0) /
//         course.rating.length
//       : 0;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Rate this course</h3>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center">
          <RatingStars
            rating={userRating}
            setRating={handleRatingSubmit}
            editable={true}
          />
        </div>
        <p className="text-sm text-gray-500">
          {userRating > 0 ? "Thanks for rating!" : "Click to rate"}
        </p>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(course.averageRating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="font-medium">{course.averageRating.toFixed(1)}</span>
          <span className="text-gray-500">
            ({course.rating.length} ratings)
          </span>
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
