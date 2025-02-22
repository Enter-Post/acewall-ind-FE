import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

function DeshBoardCard({ mainHeading, data }) {
  return (
    <Card className="w-[45%] h-fit">
      <CardHeader className="flex-row justify-between ">
    <CardTitle className="text-lg"> {mainHeading} </CardTitle>
    <Link to="mycourses" className="text-green-600 text-xs">
      View All
    </Link>
  </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {data.map((data, index) => (
            <div key={index} className="px-4 py-3">
              <p className="">{data}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Assignment({ mainHeading, data, bgcolor, bordercolor }) {
  return (
    <Card className={`${bgcolor} w-[45%] h-auto ${bordercolor}`}>
      
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
              <h3 >
                {assignment.course}
              </h3>
              <p className="text-xs text-muted-foreground ">
                Due: {assignment.dueDate}
              </p>
              </div>
              <p className="text-muted-foreground text-sm mt-2">{assignment.Assignment}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { DeshBoardCard, Assignment };
