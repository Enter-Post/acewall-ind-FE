import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
                <Link to={link}>
                  <p className="hover:font-semibold transition-all duration-300 cursor-pointer">
                    {item.title}
                  </p>
                </Link>
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
        <Link to="assignment">
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
        </Link>
      </CardContent>
    </Card>
  );
}

function AnnouncementCard({ mainHeading, data }) {
  return (
    <Card className="h-fit p-0">
      <CardContent className="p-0">
        {/* Announcement Header */}
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
          Anouncements
        </p>

        {/* Announcements List */}
        <div className="divide-y">
          {data?.map((announcement, index) => (
            <div
              key={index}
              className="px-4 py-3 flex flex-col gap-3 border-b border-gray-300"
            >
              {/* Title and Date/Time */}
              <div className="flex justify-between items-center">
                <p className="font-bold">{announcement.title}</p>
                <p className="text-sm text-gray-500">
                  {announcement.date} • {announcement.time}
                </p>
              </div>

              {/* Announcement Message */}
              <p className="text-gray-700">{announcement.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CoursesCard({ course, link }) {
  return (
    <Link key={course.id} to={link}>
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

const StudentCard = ({ student }) => (
  <Link to={`/teacher/studentProfile`}>
    <Card className="overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={student.image} alt={student.name} />
          <AvatarFallback>
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold mb-1 text-center">
          {student.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{student.email}</p>
        <div className="w-full grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-gray-500">Students</span>
          <span className="text-right">
            {student.students.toLocaleString()}
          </span>
          <span className="text-gray-500">Joined at</span>
          <span className="text-right">{student.joinedAt}</span>
          <span className="text-gray-500">Courses</span>
          <span className="text-right">{student.courses}</span>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const TransactionCard = ({ title, data }) => (
  <Card className="h-fit p-0 gap-3 rounded mt-5">
    <CardContent className="px-3 py-0">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            <TableHead className="text-xs font-medium text-gray-500 py-3">
              Date
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 py-3">
              Time
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 py-3 text-center">
              Earnings
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 py-3 text-center">
              Withdrawals
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 py-3 text-center">
              Balance
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction, index) => (
            <TableRow key={index} className="border-t border-gray-100">
              <TableCell className="text-sm text-gray-700 py-4">
                {transaction.date}
              </TableCell>
              <TableCell className="text-sm text-gray-700 py-4">
                {transaction.time}
              </TableCell>
              <TableCell className="text-sm text-green-600 py-4 text-center">
                {transaction.type === "Earning"
                  ? `$${transaction.amount}`
                  : "-"}
              </TableCell>
              <TableCell className="text-sm text-red-600 py-4 text-center">
                {transaction.type === "Withdrawal"
                  ? `$${transaction.amount}`
                  : "-"}
              </TableCell>
              <TableCell className="text-sm text-black py-4 text-center">
                {transaction.balance}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const EarningStateCard = ({ data }) => {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div
          className={`h-12 w-12 rounded-lg flex ${data.bgColor} items-center justify-center mr-4`}
        >
          {data.icon}
        </div>
        <div>
          <p className="text-xl font-bold"> {data.value} </p>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const LandingPageCard = ({ name, description, imageUrl, buttonUrl }) => {
  return (
    <Card className="pb-6 pt-0 overflow-hidden cursor-pointer border flex flex-col gap-3">
      <AspectRatio ratio={16 / 5}>
        <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
      </AspectRatio>
      <CardHeader>
        {/* <CardTitle>{name}</CardTitle> */}
        <p className="text-lg font-bold">{name}</p>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 space-y-2">
          <p className="text-muted-foreground text-xs">{description}</p>
          <a
            href={buttonUrl}
            className="inline-flex items-center justify-center w-full px-3 py-2 mt-auto text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Learn more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

// const LandingPageCard = ({ name, description, imageUrl, buttonUrl }) => {
//   return (
//     <Card className="pb-6 pt-0 overflow-hidden cursor-pointer border flex flex-col">
//       {/* <AspectRatio ratio={16 / 5}>
//         <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
//       </AspectRatio> */}
//       <CardHeader>
//         <p className="text-lg font-bold mt-5">{name}</p>
//       </CardHeader>
//       <CardContent className="flex flex-col flex-1">
//         <div className="flex flex-col flex-1 space-y-2">
//           <p className="text-muted-foreground text-xs">{description}</p>
//           <a
//             href={buttonUrl}
//             className="inline-flex items-center justify-center w-full px-3 py-2 mt-auto text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//           >
//             Learn more
//             <svg
//               className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 10"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M1 5h12m0 0L9 1m4 4L9 9"
//               />
//             </svg>
//           </a>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

export {
  DeshBoardCard,
  Assignment,
  AnnouncementCard,
  CoursesCard,
  StudentCard,
  TransactionCard,
  EarningStateCard,
  LandingPageCard
};
