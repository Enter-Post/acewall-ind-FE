import { createContext, useState } from "react";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState({
    basics: {},
    chapters: [],
    grades: {},
  });

  return (
    <CourseContext.Provider
      value={{
        course,
        setCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
