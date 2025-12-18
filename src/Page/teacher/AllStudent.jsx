import { GlobalContext } from "@/Context/GlobalProvider";
import { StudentCard } from "@/CustomComponent/Card";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const headingRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axiosInstance.get("/course/getallCoursesforTeacher");
        setStudents(res.data.students || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load students. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Focus the heading when content changes for screen readers
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, [students, error]);

  return (
    <main className="container mx-auto px-4 py-8" aria-labelledby="students-heading">
      <h1
        id="students-heading"
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-bold mb-6"
      >
        Students{" "}
        <span className="font-normal text-gray-500">
          ({students?.length.toLocaleString()})
        </span>
      </h1>

      {loading ? (
        <div
          className="flex flex-col items-center justify-center space-y-2"
          role="status"
          aria-live="polite"
        >
          <div className="spinner" aria-hidden="true"></div>
          <p>Loading students...</p>
        </div>
      ) : error ? (
        <div role="alert" className="text-red-600">
          {error}
        </div>
      ) : students.length === 0 ? (
        <p>No students found. Please try selecting a different course.</p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="list"
        >
          {students.map((student) => (
            <Link
              key={student._id}
              to={`/teacher/studentProfile/${student._id}`}
              state={{ student }}
              className="focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
              role="listitem"
            >
              <StudentCard student={student} />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default AllStudent;
