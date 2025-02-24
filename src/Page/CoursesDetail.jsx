import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, GraduationCap, PlayCircle, Award, Users, Download, Menu } from "lucide-react"
import { Button } from '@/components/ui/button'
import { TopNavbarDropDown } from '@/CustomComponent/TopNavDropDown'
import { Input } from '@/components/ui/input'
import { ArrowDown01Icon } from '@/assets/Icons/ArrowDown'
import { useParams } from 'react-router-dom'

const CoursesDetail = () => {

    const { id } = useParams()
    const [currentCourse, setCurrentCourse] = useState(null)

    const courses = [
        {
            id: 1,
            courseName: "Web Development",
            numberOfLessons: 25,
            rating: 5,
            image: "https://plus.unsplash.com/premium_vector-1733734464224-12248f9547af?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            courseName: "Graphic Designing",
            numberOfLessons: 20,
            rating: 3,
            image: "https://plus.unsplash.com/premium_vector-1732811932898-9bed660ff22d?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 3,
            courseName: "Digital Marketing",
            numberOfLessons: 15,
            rating: 4,
            image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    const getelectedCourse = courses.filter((data) => {
        return data.id == id
    });

    useEffect(() => {
        if (id) {
            setCurrentCourse(getelectedCourse);
        }
    }, [id]);

    console.log(currentCourse);

    return (
        <div>
            <header className="sticky top-0 z-10 bg-gray-100">
                <div className="h-8 bg-green-600 flex justify-end items-center px-5 cursor-pointer">
                    <TopNavbarDropDown />
                    <ArrowDown01Icon />
                </div>
                <div className="flex h-16 items-center justify-between px-4 border">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Sidebar</span>
                    </Button>
                    <div className="text-xl font-semibold">ScholarNest</div>
                </div>
            </header>

            <div className="h-screen container mx-auto p-6">
                <Card className="bg-gray-200 ">
                    <CardContent className="p-6">
                        {currentCourse ? (
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-3xl font-bold mb-4">{currentCourse[0]?.courseName}</CardTitle>
                                    </CardHeader>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <span className="mr-2">Course Reviews</span>
                                            {[...Array(currentCourse[0]?.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                                            ))}
                                        </div>
                                        <div className="flex items-center">
                                            <GraduationCap className="w-5 h-5 mr-2" />
                                            <span>Track: Languages</span>
                                        </div>
                                        <div className="flex items-center">
                                            <PlayCircle className="w-5 h-5 mr-2" />
                                            <span>
                                                Lessons: <strong>30</strong>
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Award className="w-5 h-5 text-yellow-500 mr-2" />
                                            <span>Free Certificate After Course Completion</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3">
                                    <img
                                        src={currentCourse[0]?.image}
                                        alt={currentCourse[0]?.courseName}
                                        className="rounded-lg w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        ) : (
                            <p>Loading course details...</p>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-4 justify-start p-6">
                        <Button className="bg-green-400 hover:bg-green-500 text-black transition-colors">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Start Learning
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default CoursesDetail
