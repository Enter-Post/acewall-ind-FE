import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBox from "@/CustomComponent/SearchBox";
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { GlobalContext } from "@/Context/GlobalProvider";
import { MyCoursesCard } from "@/CustomComponent/Card";
import { Loader } from "lucide-react";

const CourseCards = () => {
  const [enrollment, setEnrollment] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(GlobalContext);

  const searching = searchQuery.trim() !== "";

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchCourses = async () => {
        setLoading(true);
        try {
          const res = await axiosInstance.get("/enrollment/studentCourses", {
            params: { search: searchQuery },
          });
          setEnrollment(res.data.enrolledCourses || []);
        } catch (error) {
          console.error("Error fetching courses:", error);
          setEnrollment([]);
        } finally {
          setLoading(false);
        }
      };

      fetchCourses();
    }, 500); // debounce delay

    return () => clearTimeout(timeoutId); // cleanup
  }, [searchQuery]);

  return (
    <section className="p-3 md:p-0" aria-labelledby="my-courses-heading">
      <div className="flex flex-col pb-5 gap-5 mb-10">
        <div>
          {/* Replaced <p> with <h1> for correct semantic heading hierarchy */}
          <h1 
            className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg"
            id="my-courses-heading"
          >
            My Courses
          </h1>
        </div>
        {/* Assuming SearchBox internally handles its input labeling, but adding ARIA for safety */}
        <SearchBox 
          query={searchQuery} 
          setQuery={setSearchQuery} 
          aria-label="Search my enrolled courses"
        />
      </div>

      {/* Loading State: Uses role="status" and aria-live="polite" */}
      {loading ? (
        <div className="flex justify-center items-center py-10" role="status" aria-live="polite">
          <Loader className="animate-spin" aria-hidden="true" />
          <span className="sr-only">Loading courses...</span>
        </div>
      ) : enrollment.length === 0 ? (
        // Empty State: Uses role="status" and aria-live="polite"
        <div 
          className="flex flex-col items-center justify-center text-center px-4"
          role="status" 
          aria-live="polite"
        >
          {searching ? (
            <>
              {/* Using a structural <p> tag for the dynamic search message */}
              <p className="text-2xl font-semibold text-muted-foreground">
                No course found for <span className="font-bold">"{searchQuery}"</span>
              </p>
              <p className="text-md mt-4 text-muted-foreground">
                Try a different keyword or explore all courses.
              </p>
              <Button
                className="mt-6 bg-green-500 text-white hover:bg-acewall-main"
                onClick={() => setSearchQuery("")}
                aria-label="Reset search query" // Descriptive action for screen readers
              >
                Reset Search
              </Button>
            </>
          ) : (
            <>
              {/* Using a structural <p> tag for the main empty message */}
              <p className="text-2xl font-semibold text-muted-foreground">
                Kickstart your learning journey
              </p>
              <p className="text-lg text-muted-foreground mt-2">
                When you enroll in a course, it will appear here.
              </p>
            </>
          )}
        </div>
      ) : (
        // Course Grid: Uses role="list" implicitly, but explicit ARIA can help
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label={searching ? `Search results for ${searchQuery}` : "Enrolled courses"}
        >
          {enrollment.map((course, index) => (
            // Course Link: Ensures the entire card is focusable and acts as a link
            <Link 
              key={course._id || index} 
              to={`/student/mycourses/${course._id}`}
              role="listitem" // Explicitly mark as a list item
              aria-label={`Go to course: ${course.course.courseTitle || 'Untitled Course'}`}
            >
              <MyCoursesCard course={course} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default CourseCards;