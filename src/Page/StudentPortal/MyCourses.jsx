import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBox from "@/CustomComponent/SearchBox";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/AxiosInstance";
import oopsImage from "@/assets/oopsimage.png";

const CourseCards = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const searching = searchQuery.trim() !== "";

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/course/get`, {
          params: { search: searchQuery },
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]); // prevent showing stale data
      } finally {
        setLoading(false);
      }
    };



    getCourses();
  }, [searchQuery]);

  return (
    <section className="p-3 md:p-0">
      <div className="flex flex-col pb-5 gap-5 mb-10">
        <div>
          <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
            My Courses
          </p>
        </div>
        <SearchBox query={searchQuery} setQuery={setSearchQuery} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-lg text-muted-foreground">Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center px-4">
          {searching ? (
            <>
              <h1 className="text-2xl font-semibold text-muted-foreground">No course found for "{searchQuery}"</h1>
              {/* <img src={oopsImage} alt="No result" className="w-full max-w-md h-80 object-contain mt-6" /> */}
              <p className="text-md mt-4 text-muted-foreground">Try a different keyword or explore all courses.</p>
              <ul className="list-disc pl-6 leading-relaxed mt-4 text-left">
                <li>Make sure all words are spelled correctly</li>
                <li>Try different search terms</li>
                <li>Try more general search terms</li>
              </ul>
              <Button
                className="mt-6 bg-green-500 text-white hover:bg-acewall-main"
                onClick={() => setSearchQuery("")}
              >
                Reset Search
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-muted-foreground">Kickstart your learning journey</h1>
              <p className="text-lg text-muted-foreground mt-2">
                When you enroll in a course, it will appear here.
              </p>
              <img src={oopsImage} alt="No courses" className="w-full max-w-md h-80 object-contain mt-6" />
              <Link to="/student/courses">
                <Button className="mt-6 bg-green-500 text-white hover:bg-acewall-main">
                  Explore Courses
                </Button>
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course._id}
              to={`/student/myCourseDetail/${course._id}`}
            >
              <Card className="pb-6 pt-0 w-full overflow-hidden cursor-pointer">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={course.basics.thumbnail || "/placeholder.svg"}
                    alt={`${course.basics.thumbnail} image`}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <CardHeader>
                  <div className="uppercase text-indigo-600 bg-indigo-100 text-xs font-medium mb-2 w-fit px-2">
                    {course.basics.category?.title || "Development"}
                  </div>
                  <CardTitle className="flex justify-between items-center">
                    <span>{course.basics.courseTitle}</span>
                    <span className="text-lg font-semibold text-green-500">${course.basics.price}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Teacher: {course.createdby?.firstName}{" "}
                      {course.createdby?.middleName ? course.createdby.middleName + " " : ""}
                      {course.createdby?.lastName}
                    </p>                    <p className="text-sm text-muted-foreground">Language: {course.basics.language}</p>
                    <p className="text-sm text-muted-foreground">Chapters: {course.chapters.length}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default CourseCards;
