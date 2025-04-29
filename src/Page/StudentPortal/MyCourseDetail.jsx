import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/AxiosInstance";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { CheckCircle, CheckCircle2, ChevronDown, ChevronRight, PlayCircle, Star, StarHalf } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";




export default function MyCourseDetail() {
  const { id } = useParams(); // ✅ Get the ID from the URL
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);


  const [expandedSections, setExpandedSections] = useState({});


  function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }


  const toggleSection = (title) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        console.log("Fetching course with ID:", id);
        const response = await axiosInstance.get(`/course/get/${id}`);
        console.log("API Response:", response.data);

        if (response.data?.course) {
          setCourseDetails(response.data.course);
        } else {
          console.error("No course found in response");
          setCourseDetails(null);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        setCourseDetails(null);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (id) getCourseDetails();
    }, 2000);

    return () => clearTimeout(timer);
  }, [id]);

  console.log("Course Details State:", courseDetails);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!courseDetails) return <div className="p-6 text-red-500">Course not found.</div>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Left side - Video and Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-2 border-b">
          <h1 className="text-xl font-bold mb-2">
            {courseDetails.basics.courseTitle}
          </h1>

        </div>
        {courseDetails.chapters?.map((chapter) => (
          <div key={chapter._id} className="mb-8">
            {/* <h2 className="text-xl font-bold mb-4">{chapter.description}</h2> */}

            {chapter.lessons?.map((lesson) => (
              <div key={lesson._id} className="mb-6">
                <h3 className="text-lg font-semibold mb-2"> Lesson: {  lesson.title}</h3>

                {/* Video Player */}
                {lesson.youtubeLinks ? (
                  <div className="relative w-full h-0" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(lesson.youtubeLinks)}`}
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <p>No YouTube link available</p>
                )}
              </div>
            ))}
          </div>
        ))}



        {/* Course Title */}


        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full p-5">
          <TabsList className="grid grid-cols-4 bg-transparent border-b border-gray-200 border w-full text-green-600">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:border-b-3   data-[state=active]:border-green-500 rounded-none"
            >
              Description
            </TabsTrigger>
            {/* <TabsTrigger
              value="curriculum"
              className="data-[state=active]:border-b-3   data-[state=active]:border-green-500 rounded-none"
            >
              
            </TabsTrigger> */}
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:border-b-3   data-[state=active]:border-green-500 rounded-none"
            >
              Attach Files
            </TabsTrigger>
            <TabsTrigger
              value="instructor"
              className="data-[state=active]:border-b-3   data-[state=active]:border-green-500 rounded-none"
            >
              Instructor
            </TabsTrigger>

          </TabsList>

          {/* overview */}
          <TabsContent value="overview" className="p-6">
            {courseDetails?.chapters?.map((chapter, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold">{chapter.title}</h3>
                <span className="text-gray-600 mt-4 text-sm block">
                  {chapter.lessons.map((lesson, index) => (
                    <span key={index} className="block">
                      {lesson.description}
                    </span>
                  ))}
                </span>
              </div>
            ))}






          </TabsContent>

          {/* curriculam */}
          <TabsContent value="curriculum" className="p-6">
            <Accordion type="curriculum" collapsible className="w-full">
              {Array.isArray(courseDetails?.chapters) && courseDetails.chapters.length > 0 ? (
                courseDetails.chapters.map((chapter, index) => (
                  <AccordionItem key={index} value={`chapter-${index}`}>
                    <AccordionTrigger className="py-4 text-sm font-semibold flex justify-between items-center group">
                      <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      <span>{chapter.title}</span>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="space-y-4 pl-6">
                        {Array.isArray(chapter.lessons) && chapter.lessons.length > 0 ? (
                          chapter.lessons.map((lesson, i) => (
                            <Collapsible key={i}>
                              <CollapsibleContent className="mt-3 rounded-lg bg-gray-50 border border-gray-200 p-4 shadow-inner space-y-3">

                                {Array.isArray(lesson.pdfFiles) && lesson.pdfFiles.length > 0 && (
                                  <div className="text-sm text-gray-400 space-y-1 cursor-not-allowed">
                                    {lesson.pdfFiles.map((pdf, idx) => (
                                      <div key={idx}>
                                        <span
                                          className="text-gray-400 hover:underline"
                                          title="Access restricted"
                                        >
                                          📄 View PDF {idx + 1}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}

                              </CollapsibleContent>

                            </Collapsible>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500">No lessons available</div>
                        )}
                      </div>

                      {/* {Array.isArray(chapter.assessment) && chapter.assessment.length > 0 && (
                        <div className="mt-6 border-t pt-4 space-y-2 pl-6">
                          <div className="text-sm font-medium text-gray-700">Assessment</div>
                          {chapter.assessment.map((assess, j) => (
                            <div key={j} className="text-sm text-gray-600">
                              {assess.title} — <span className="italic">{assess.description}</span>
                            </div>
                          ))}
                        </div>
                      )} */}
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <div className="text-sm text-gray-500">No chapters available</div>
              )}
            </Accordion>
          </TabsContent>

          {/* instructor */}
          <TabsContent value="instructor" className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage

                  src={courseDetails.createdby.profileImage}
                  alt="Instructor"
                />
                {/* <AvatarFallback>VS</AvatarFallback> */}
              </Avatar>
              <div>
                <h3 className="text-lg font-bold">
                  {courseDetails.createdby.firstName} {courseDetails.createdby.middleName} {courseDetails.createdby.lastName}
                </h3>

                <div className="flex items-center gap-2 mt-2">
                  <Star
                    size={16}
                    className="text-yellow-400 fill-yellow-400"
                  />
                  {/* <span className="text-sm font-medium">
                              {courseDetails.createdby.rating} Instructor Rating
                            </span> */}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {/* <User size={16} className="text-gray-500" /> */}
                  {/* <span className="text-sm text-gray-500">
                              {courseDetails.instructor.students} Students
                            </span> */}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <PlayCircle size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">
                    5 Courses
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-4">
                  {courseDetails.createdby.bio}
                </p>
              </div>
            </div>
          </TabsContent>

          {/* reviews */}
          <TabsContent value="reviews" className="p-6">
            <div className="space-y-4">
              {Array.isArray(courseDetails?.chapters) &&
                courseDetails.chapters[0]?.lessons &&
                courseDetails.chapters[0].lessons[0]?.pdfFiles?.length > 0 ? (
                courseDetails.chapters[0].lessons[0].pdfFiles.map((pdf, index) => (
                  <div key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                    📄 PDF {index + 1}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No PDF files available for this lesson</div>
              )}
            </div>
          </TabsContent>


        </Tabs>
      </div>

      {/* Right side - Course Contents */}
      <div className="w-full lg:w-80 border-l bg-gray-50 overflow-auto max-h-screen hide-scrollbar">


        <div className="max-h-[calc(100vh-64px)]">
          {courseDetails.chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="border-b">
              <button
                className="flex items-center justify-between w-full p-4 text-left"
                onClick={() => toggleSection(chapter.title)}
              >
                {expandedSections[chapter.title] ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                <span className="flex-1 ml-2 font-medium text-sm">
                  {chapter.title}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <CheckCircle className="w-3 h-3 text-gray-400 mr-1" />{" "}
                  {chapter.lessons.length} lessons
                </span>
              </button>
              {expandedSections[chapter.title] && (
                <div className="pl-10 pr-4 pb-2">
                  {chapter.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="py-2 flex items-center text-sm">
                      <span className="ml-2 text-gray-700">{lesson.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
