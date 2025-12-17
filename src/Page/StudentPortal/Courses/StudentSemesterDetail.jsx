import { CourseContext } from "@/Context/CoursesProvider";
import { axiosInstance } from "@/lib/AxiosInstance";
import { format } from "date-fns";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";

const StudentSemesterDetail = () => {
  const { semesterId, courseId } = useParams();
  const { quarters } = useContext(CourseContext);
  const [allQuarter, setAllQuarter] = useState([]);

  useEffect(() => {
    const fetchQuarters = async () => {
      try {
        const res = await axiosInstance.get(`quarter/get/${semesterId}`);
        setAllQuarter(res.data.quarters);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuarters();
  }, [semesterId, quarters]);

  return (
    <main className="space-y-4" aria-labelledby="quarter-list-title">
      <h2 id="quarter-list-title" className="text-lg font-semibold text-black">
        Quarters
      </h2>

      {allQuarter?.length > 0 ? (
        allQuarter.map((quarter) => (
          <Link
            key={quarter._id}
            to={`/student/mycourses/${courseId}/chapters?quarterID=${quarter._id}&&semesterbased=true`}
            aria-label={`Go to chapters for Quarter ${quarter.title}`}
          >
            <div
              className="mb-4 border border-gray-200 p-5 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
              role="button"
              tabIndex={0}
            >
              <h3 className="font-semibold text-md">Quarter: {quarter.title}</h3>
              <p className="text-xs text-muted-foreground">
                {format(new Date(quarter.startDate), "MMMM do, yyyy")} -{" "}
                {format(new Date(quarter.endDate), "MMMM do, yyyy")}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-sm text-muted-foreground" role="status">
          No quarters selected.
        </p>
      )}
    </main>
  );
};

export default StudentSemesterDetail;
