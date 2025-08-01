import { GlobalContext } from "@/Context/GlobalProvider";
import { StudentCard } from "@/CustomComponent/Card";
import SelectCmp from "@/CustomComponent/SelectCmp";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Students{" "}
        <span className="font-normal text-gray-500">
          ({students?.length.toLocaleString()})
        </span>
      </h1>
      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      ) : students.length === 0 ? (
        <p>No students found. Please try selecting a different course.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map((student, index) => (
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
