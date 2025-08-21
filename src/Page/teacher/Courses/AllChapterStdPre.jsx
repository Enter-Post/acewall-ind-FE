import BackButton from "@/CustomComponent/BackButton";
import { axiosInstance } from "@/lib/AxiosInstance";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AllChapterStdPre = () => {
  const { courseId, quarterId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [quarterStartDate, setQuarterStartDate] = useState("");
  const [quarterEndDate, setQuarterEndDate] = useState("");

  const fetchQuarterDetail = async () => {
    try {
      const res = await axiosInstance.get(`chapter/${courseId}/${quarterId}`);
      const data = res.data;

      if (Array.isArray(data.chapters)) {
        setChapters(data.chapters);
        setQuarterStartDate(data.quarterStartDate);
        setQuarterEndDate(data.quarterEndDate);
      } else {
        setChapters([]);
      }
    } catch (err) {
      console.error("Error fetching chapters:", err);
      setChapters([]);
    }
  };

  useEffect(() => {
    fetchQuarterDetail();
  }, []);

  return (
    <div>
      <BackButton className="mb-10" />

      <div className="text-lg font-semibold mb-4">Chapters:</div>
      {chapters.map((chapter, index) => (
        <Link
          key={chapter._id}
          to={`/teacher/courses/${courseId}/quarterStdPre/${quarterId}/chapterStdPre/${chapter._id}`}
        >
          <span className="text-sm font-semibold text-gray-700">Chapter: {index + 1}</span>
          <div className="mb-4 border border-gray-200 p-5 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer transition-all duration-200 shadow-sm">
            <h3 className="font-semibold text-md text-blue-800">
              {chapter.title}
            </h3>
            <p className="font-light text-sm text-muted-foreground">
              {chapter.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllChapterStdPre
  ;
