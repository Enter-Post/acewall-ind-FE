import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const StudentCard = ({ student }) => (
  <Link to={`/teacherPortal/studentProfile`}>
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

const AllStudent = ({ totalCount }) => {
  const students = [
    {
      id: 1,
      name: "Esther Howard",
      email: "EstherHoward@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 50274,
      joinedAt: "17 Aug, 2020",
      courses: 12,
    },
    {
      id: 2,
      name: "Cameron Williamson",
      email: "CameronW@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 42158,
      joinedAt: "23 Sep, 2020",
      courses: 8,
    },
    {
      id: 3,
      name: "Brooklyn Simmons",
      email: "Brooklyn.S@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 35921,
      joinedAt: "14 Oct, 2020",
      courses: 15,
    },
    {
      id: 4,
      name: "Leslie Alexander",
      email: "Leslie.Alexander@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 48732,
      joinedAt: "5 Jul, 2020",
      courses: 10,
    },
    {
      id: 5,
      name: "Dianne Russell",
      email: "Dianne.R@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 39845,
      joinedAt: "12 Nov, 2020",
      courses: 7,
    },
    {
      id: 6,
      name: "Jenny Wilson",
      email: "JennyW@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 52103,
      joinedAt: "30 Jun, 2020",
      courses: 14,
    },
    {
      id: 7,
      name: "Kathryn Murphy",
      email: "Kathryn.M@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 45678,
      joinedAt: "8 Aug, 2020",
      courses: 9,
    },
    {
      id: 8,
      name: "Cody Fisher",
      email: "Cody.Fisher@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 38291,
      joinedAt: "19 Sep, 2020",
      courses: 11,
    },
    {
      id: 9,
      name: "Darrell Steward",
      email: "Darrell.S@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 47123,
      joinedAt: "25 Jul, 2020",
      courses: 13,
    },
    {
      id: 10,
      name: "Robert Fox",
      email: "Robert.Fox@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 41569,
      joinedAt: "3 Oct, 2020",
      courses: 6,
    },
    {
      id: 11,
      name: "Jacob Jones",
      email: "Jacob.Jones@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 49823,
      joinedAt: "15 Aug, 2020",
      courses: 10,
    },
    {
      id: 12,
      name: "Theresa Webb",
      email: "Theresa.W@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 36742,
      joinedAt: "27 Sep, 2020",
      courses: 8,
    },
    {
      id: 13,
      name: "Kristin Watson",
      email: "Kristin.W@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 43215,
      joinedAt: "9 Nov, 2020",
      courses: 12,
    },
    {
      id: 14,
      name: "Courtney Henry",
      email: "Courtney.H@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 51478,
      joinedAt: "21 Jul, 2020",
      courses: 15,
    },
    {
      id: 15,
      name: "Eleanor Pena",
      email: "Eleanor.P@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 40367,
      joinedAt: "4 Oct, 2020",
      courses: 9,
    },
    {
      id: 16,
      name: "Devon Lane",
      email: "Devon.Lane@gmail.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
      students: 46982,
      joinedAt: "16 Aug, 2020",
      courses: 11,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Students{" "}
        <span className="font-normal text-gray-500">
          ({students.length.toLocaleString()})
        </span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {students?.map((student, index) => (
          <StudentCard key={index} student={student} />
        ))}
      </div>
    </div>
  );
};

export default AllStudent;
