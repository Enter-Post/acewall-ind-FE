import { axiosInstance } from "@/lib/AxiosInstance";
import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseLoading, setCourseLoading] = useState(false);
  const [course, setCourse] = useState({
    basics: {},
    chapters: [],
  });

  console.log(course, "course");

  const getCourse = async () => {
    try {
      setCourseLoading(true);
      const res = await axiosInstance.post("course/create", course);
      toast.success(res.data.message);
      setCourseLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(res.data.message);
      setCourseLoading(false);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        course,
        setCourse,
        getCourse,
        courseLoading,
        setCourseLoading,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
