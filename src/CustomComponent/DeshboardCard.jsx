import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function DeshBoardCard({ mainHeading, data, link }) {
  return (
    <Card className=" h-fit border">
      <CardHeader className="flex-row justify-between">
        <CardTitle className="text-lg"> {mainHeading} </CardTitle>
        <Link to={link} className="text-green-600 text-xs">
          View All
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {data?.map((data, index) => (
            <div key={index} className="px-4 py-3">
              <p className="">{data.title}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Assignment({ mainHeading, data, bgcolor, bordercolor }) {
  return (
    <Card className={`${bgcolor} h-auto ${bordercolor}`}>
      <CardHeader className="flex-row justify-between ">
        <CardTitle className="text-lg">Assignments Due </CardTitle>
        <Link to="assignment" className="text-green-600 text-xs">
          View All
        </Link>
      </CardHeader>
      <CardContent className={`p-0 ${bgcolor} `}>
        <div
          className={`divide-y 
          `}
        >
          {data.map((assignment, index) => (
            <div key={index} className="p-4">
              <div className="flex justify-between">
                <h3>{assignment.course}</h3>
                <p className="text-xs text-muted-foreground ">
                  Due: {assignment.dueDate}
                </p>
              </div>
              <p className="text-muted-foreground text-sm mt-2">
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
    <Card className="h-fit">
      <CardContent className="p-0">
          <p className="text-xl px-4 pb-4 font-bold">Announcement</p>
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
      <Card className="pb-6 pt-0 w-full overflow-hidden cursor-pointer">
        <AspectRatio ratio={16 / 9}>
          <img
            src={course.image || "/placeholder.svg"}
            alt={`${course.course} image`}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle>{course.course}</CardTitle>
          <p className="text-xs">Teacher: {course.teacher}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Grade: {course.Grade}
            </p>
            <p className="text-sm text-muted-foreground">
              Lecture: {course.NumberOfLecture}
            </p>
            <p className="font-bold text-xl text-green-500 pt-4">
              ${course.Prise}{" "}
              <span className="text-sm text-muted-foreground">per month</span>{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export { DeshBoardCard, Assignment, AnnouncementCard, CoursesCard };
