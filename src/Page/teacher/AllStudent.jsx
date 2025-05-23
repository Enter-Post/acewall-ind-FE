import { GlobalContext } from "@/Context/GlobalProvider";
import { StudentCard } from "@/CustomComponent/Card";
import SelectCmp from "@/CustomComponent/SelectCmp";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const { user } = useContext(GlobalContext);

  // Fetch students and their courses via new API
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get("/course/getallCoursesforTeacher");
        setStudents(res.data.students || []);
        console.log(res.data.students, "students from new API");
      } catch (err) {
        console.error(err);
        alert("Failed to load students. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Extract unique course titles from student data
  const courseTitles = useMemo(() => {
    const allCourses = students.flatMap(student => student.courses || []);
    const uniqueTitles = [...new Set(allCourses.map(course => course.courseTitle))];
    return uniqueTitles;
  }, [students]);

  // Filter students by selected course title
  const filteredStudents = useMemo(() => {
    if (!selectedCourse) return students;
    return students.filter(student =>
      student.courses?.some(course => course.courseTitle === selectedCourse)
    );
  }, [students, selectedCourse]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Students{" "}
        <span className="font-normal text-gray-500">
          ({filteredStudents?.length.toLocaleString()})
        </span>
      </h1>

      <div className="mb-6 max-w-xs">
        <SelectCmp
          data={courseTitles}
          title="Filter by course title"
          className="w-full"
          value={selectedCourse}
          onChange={setSelectedCourse}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <p>No students found. Please try selecting a different course.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student, index) => (
            <Link key={index} to={`/teacher/studentProfile/${student._id}`} state={{ student }}>
              <StudentCard student={student} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStudent;
