import { axiosInstance } from "@/lib/AxiosInstance";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AllChapter = () => {
  const { courseId, quarterId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [quarterStartDate, setQuarterStartDate] = useState("");
  const [quarterEndDate, setQuarterEndDate] = useState("");

  const fetchQuarterDetail = async () => {
    await axiosInstance
      .get(`chapter/${courseId}/${quarterId}`)
      .then((res) => {
        console.log(res);
        setChapters(res.data.chapters);
        setQuarterStartDate(res.data.quarterEndDate);
        setQuarterEndDate(res.data.quarterStartDate);
      })
      .catch((err) => {
        console.log(err);
        setChapters([]);
      });
  };

  useEffect(() => {
    fetchQuarterDetail();
  }, []);

  return (
    <div>
      <div className="text-lg font-semibold mb-4">Chapters:</div>
      {chapters?.map((chapter) => (
        <Link to={`/student/mycourses/${courseId}/quarter/${quarterId}/chapter/${chapter._id}`}>
          <div
            key={chapter._id}
            className="mb-4 border border-gray-200 p-5 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer"
          >
            <h3 className="font-semibold text-md">{chapter.title}</h3>
            <p className="font-light text-sm text-muted-foreground">
              {chapter.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllChapter;
