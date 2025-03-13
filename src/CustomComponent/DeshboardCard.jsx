import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

function DeshBoardCard({ mainHeading, data, link, height }) {
  return (
    <Card
      className={`bg-gray-100 border-0 my-auto py-0 gap-2 rounded h-full`}
      style={{ height: height || "100%" }} // Ensuring both have the same height
    >
      <CardHeader className="flex-row justify-between items-center bg-green-600 py-3 rounded">
        <CardTitle className="text-lg text-white">{mainHeading}</CardTitle>
        <Link to={link} className="text-white text-xs">
          View All
        </Link>
      </CardHeader>
      <CardContent className="p-0 overflow-auto">
        <div className="divide-y">
          {data?.map((item, index) => (
            <div key={index} className="px-4 py-3 flex gap-10 items-center">
              <div className="flex-1">
                <p className="hover:font-semibold transition-all duration-300 cursor-pointer">
                  {item.title}
                </p>
              </div>

              {(item.date || item.time) && (
                <div className="text-xs text-gray-500">
                  {item.date && (
                    <p>{new Date(item.date).toLocaleDateString()}</p>
                  )}
                  {item.time && <p>{item.time}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Assignment({ mainHeading, data, bgcolor, bordercolor, height }) {
  return (
    <Card
      className={`bg-gray-100 border-0 my-auto py-0 gap-2 rounded h-full`}
      style={{ height: height || "100%" }} // Same height as DeshBoardCard
    >
      <CardHeader className="flex-row justify-between items-center bg-green-600 py-3 rounded">
        <CardTitle className="text-lg text-white">Assignments Due</CardTitle>
        <Link to="assignment" className="text-white text-xs">
          View All
        </Link>
      </CardHeader>
      <CardContent className={`p-0 ${bgcolor}`}>
        <div className={`divide-y`}>
          {data.map((assignment, index) => (
            <div key={index} className="p-4">
              <div className="flex justify-between">
                <h3 className="hover:font-semibold transition-all duration-300 cursor-pointer">
                  {assignment.course}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Due: {assignment.dueDate}
                </p>
              </div>
              <p className="text-muted-foreground text-sm mt-2 hover:font-semibold transition-all duration-300 cursor-pointer">
                {assignment.Assignment}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AnnouncementCard({ mainHeading, data }) {
  return (
    <Card className="h-fit p-0">
      <CardContent className="p-0">
        <div className="flex justify-between items-center bg-green-600 py-3 rounded" >
          <p className="text-xl px-4 font-bold ">
            Announcement
          </p>
        </div>
        <div className="divide-y">
          {data?.map((announcement, index) => (
            <div key={index} className="px-4 py-3 flex flex-col gap-5">
              <div className="flex justify-between">
                <p className="font-bold">{announcement.title}</p>
                <p className="text-sm text-gray-500">{announcement.date}</p>
              </div>
              <p className="">{announcement.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CoursesCard({ course }) {
  return (
    <Link key={course.id} to={`/studentPortal/allCourseDetails/${course.id}`}>
      <Card className="w-full overflow-hidden cursor-pointer gap-0 py-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={course.image || "/placeholder.svg"}
            alt={`${course.course} image`}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="p-4">
          <div className="uppercase text-indigo-600 bg-indigo-100 text-xs font-medium mb-2 w-fit px-2">
            {course.category || "Developments"}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {course.course}
          </h3>
          <div className="text-xl font-bold text-green-500 mb-3">
            ${course.Prise || "24.00"}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="font-medium">{course.rating || "4.9"}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <span>{course.students || "982,941"} students</span>
            </div>
          </div>

          {/* Add to cart button */}
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            Add To Cart
          </Button>
        </div>
      </Card>
    </Link>
  );
}

export { DeshBoardCard, Assignment, AnnouncementCard, CoursesCard };
