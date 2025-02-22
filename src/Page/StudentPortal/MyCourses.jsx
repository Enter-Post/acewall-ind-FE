import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const CourseCards = () => {
  const courses = [
    {
      course: "Web Development",
      RollNumber: 1010,
      Batch: 11,
      image:
        "https://plus.unsplash.com/premium_vector-1733734464224-12248f9547af?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      course: "Graphic Designing",
      RollNumber: 340,
      Batch: 2,
      image: "https://plus.unsplash.com/premium_vector-1732811932898-9bed660ff22d?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      course: "Digital Marketing",
      RollNumber: 2211,
      Batch: 10,
      image:
        "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section>
      <p className="text-xl pb-10">My Courses</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.course} className="pb-6 pt-0 w-full overflow-hidden cursor-pointer">
            <AspectRatio ratio={16 / 9}>
              <img
                src={course.image || "/placeholder.svg"}
                alt={`${course.course} image`}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <CardHeader>
              <CardTitle>{course.course}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Roll Number: {course.RollNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  Batch: {course.Batch}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CourseCards;
