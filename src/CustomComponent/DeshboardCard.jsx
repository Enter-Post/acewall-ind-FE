import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DeshBoardCard({ mainHeading, data }) {
  return (
    <Card className="w-[45%]">
      <CardHeader className="">
        <CardTitle>{mainHeading}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {data.map((data, index) => (
            <div key={index} className="px-4 py-3">
              <p className="text-muted-foreground">{data}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Assignment({ mainHeading, data, bgcolor, bordercolor }) {
  return (
    <Card className={`${bgcolor} w-[45%] ${bordercolor}`}>
      <CardHeader className="">
        <CardTitle>Assignments Due</CardTitle>
      </CardHeader>
      <CardContent className={`p-0 ${bgcolor} `}>
        <div className={`divide-y divide-black`}>
          {data.map((assignment, index) => (
            <div key={index} className="p-4">
              <h3 className="font-semibold text-sm text-primary">
                {assignment.course}
              </h3>
              <p className="text-sm mt-1">{assignment.Assignment}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Due: {assignment.dueDate}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { DeshBoardCard, Assignment };
