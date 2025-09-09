import { axiosInstance } from "@/lib/AxiosInstance";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

const AllChapter = () => {
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [quarterStartDate, setQuarterStartDate] = useState("");
  const [quarterEndDate, setQuarterEndDate] = useState("");
  const [searchParams] = useSearchParams();

  const semesterbased = searchParams.get("semesterbased");
  const quarterId = searchParams.get("quarterID");
  const actualcourseID = searchParams.get("courseId")

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

  const fetchChapterOfCourse = async () => {
    try {
      const response = await axiosInstance.get(
        `chapter/chapterofCourse/${actualcourseID}`
      );

      setChapters(response.data.chapters);
    } catch (error) {
      console.error("fetchChapterOfCourse API Error:", error);
      setChapters([]);
    }
  };

  useEffect(() => {
    if (semesterbased === "true") {
      fetchQuarterDetail();
    } else if (semesterbased === "false") {
      fetchChapterOfCourse();
    }
  }, [semesterbased, quarterId, courseId]);

  return (
    <div>
      <div className="text-lg font-semibold mb-4">Chapters:</div>
      {chapters.map((chapter, index) => (
        <Link
          key={chapter._id}
          to={`/student/mycourses/${courseId}/chapters/chapter/${chapter._id}?quarterID=${quarterId}`}
        >
          <span className="text-sm font-semibold text-gray-700">
            Chapter: {index + 1}
          </span>
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

export default AllChapter;
