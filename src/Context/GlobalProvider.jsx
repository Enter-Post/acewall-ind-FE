import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [CourseBasics, setCourseBasics] = useState();
  const [CourseChapter, setCourseChapter] = useState();
  const [CoursesGrade, setCoursesGrade] = useState();

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
