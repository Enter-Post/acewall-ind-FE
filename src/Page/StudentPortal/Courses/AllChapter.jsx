import { axiosInstance } from "@/lib/AxiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const AllChapter = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [quarterStartDate, setQuarterStartDate] = useState("");
  const [quarterEndDate, setQuarterEndDate] = useState("");
  const [searchParams] = useSearchParams();

  const semesterbased = searchParams.get("semesterbased");
  const quarterId = searchParams.get("quarterID");
  const actualcourseID = searchParams.get("courseId");

  // Fetch chapters for a specific quarter
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

  // Fetch chapters for the entire course
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

  // Handle keyboard activation (Enter key) for accessibility
  const handleKeyDown = (e, chapterId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(
        `/student/mycourses/${courseId}/chapters/chapter/${chapterId}?quarterID=${quarterId}`
      );
    }
  };

  return (
    <main aria-labelledby="chapters-title" className="space-y-4">
      <h2 id="chapters-title" className="text-lg font-semibold mb-4">
        Chapters
      </h2>

      {chapters.length > 0 ? (
        chapters.map((chapter, index) => (
          <div
            key={chapter._id}
            role="button"
            tabIndex={0}
            onClick={() =>
              navigate(
                `/student/mycourses/${courseId}/chapters/chapter/${chapter._id}?quarterID=${quarterId}`
              )
            }
            onKeyDown={(e) => handleKeyDown(e, chapter._id)}
            className="mb-4 border border-gray-200 p-5 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label={`Chapter ${index + 1}: ${chapter.title}. Press Enter to view chapter.`}
          >
            <span className="text-sm font-semibold text-gray-700">
              Chapter: {index + 1}
            </span>
            <h3 className="font-semibold text-md text-blue-800">{chapter.title}</h3>
            <p className="font-light text-sm text-muted-foreground">{chapter.description}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground" role="status">
          No chapters available.
        </p>
      )}
    </main>
  );
};

export default AllChapter;
