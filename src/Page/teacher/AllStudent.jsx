import { GlobalContext } from "@/Context/GlobalProvider";
import { StudentCard } from "@/CustomComponent/Card";
import SelectCmp from "@/CustomComponent/SelectCmp";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teacherCourses, setTeacherCourses] = useState([]); // Added state for teacher's courses
  const [selectedCourse, setSelectedCourse] = useState("");
  const { user } = useContext(GlobalContext);

  // Fetch students and teacher's courses
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        
        // Fetch students (already purchased courses by users)
        const studentRes = await axiosInstance.get("/course/getpurchaseCourse");
        setStudents(studentRes.data.users || []);
        console.log(studentRes ,"studentres");
        
        // Fetch teacher's courses
        const teacherRes = await axiosInstance.get("/course/getMyCourses");
        setTeacherCourses(teacherRes.data.courses || []);
        console.log(teacherRes ,"teacherres");
        
      } catch (err) {
        console.error(err);
        alert("Failed to load students. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Extract course titles that belong to the teacher
  const courseTitles = useMemo(() => {
    return teacherCourses.map(course => course.basics.courseTitle);
  }, [teacherCourses]);

  // Filter students based on selected course
  const filteredStudents = useMemo(() => {
    if (!selectedCourse) return students;
    return students.filter((student) =>
      student.purchasedCourse?.some(
        (course) => course.basics?.courseTitle === selectedCourse
      )
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

      {/* <div className="mb-6 max-w-xs">
        <SelectCmp
          data={courseTitles}
          title="Filter by course title"
          className="w-full"
          value={selectedCourse} // Bind selectedCourse to the dropdown
          onChange={setSelectedCourse}
        />
      </div> */}

      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="spinner"></div> {/* Add a spinner here */}
          <p>Loading students...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <p>No students found. Please try selecting a different course.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student, index) => (
            <Link key={index} to={`/teacher/studentProfile/${student._id}`}>
              <StudentCard student={student} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStudent;
