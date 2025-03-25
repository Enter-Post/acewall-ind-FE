import { useState } from "react";
import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CreateCourses() {
  const [thumbnail, setThumbnail] = useState(null);
  const [courseTitle, setCourseTitle] = useState("is simply dummy text of.");
  const [courseDescription, setCourseDescription] = useState(
    "is simply dummy text of."
  );
  const [teachingPoints, setTeachingPoints] = useState(["", "", ""]);
  const [requirements, setRequirements] = useState(["", "", "", ""]);

  const handleTeachingPointChange = (index, value) => {
    const newTeachingPoints = [...teachingPoints];
    newTeachingPoints[index] = value;
    setTeachingPoints(newTeachingPoints);
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleThumbnailRemove = () => {
    setThumbnail(null);
  };

  return (
    <div className="container">
        <div className="" >
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg ">
          Create Course
        </p>
      </div>

      <Card className="p-6">
        <div className="border-l-4 border-green-500 pl-4 mb-6">
          <h2 className="text-xl font-semibold">Basics</h2>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="thumbnail" className="block mb-2">
              Thumbnail
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-1 w-full max-w-md">
              {thumbnail ? (
                <div className="relative">
                  <img src={thumbnail} alt="" />
                  <div className="absolute bottom-2 right-2 flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white hover:bg-gray-100 text-indigo-500"
                      onClick={handleThumbnailChange}
                    >
                      Change
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white hover:bg-gray-100 text-red-500"
                      onClick={handleThumbnailRemove}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px]">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="thumbnailInput"
                    onChange={handleThumbnailChange} // Ensure this function exists
                  />

                  {/* Upload Button */}
                  <label htmlFor="thumbnailInput">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all cursor-pointer">
                      <Upload size={16} />
                      Upload Thumbnail
                    </button>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="courseTitle" className="block mb-2">
                Course Title
              </Label>
              <Input
                id="courseTitle"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="bg-gray-50"
              />
            </div>

            <div>
              <Label htmlFor="category" className="block mb-2">
                Category
              </Label>
              <Select defaultValue="marketing">
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="language" className="block mb-2">
              Language
            </Label>
            <Select defaultValue="english" className="max-w-xs">
              <SelectTrigger className="bg-gray-50">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="courseDescription" className="block mb-2">
              Course Description
            </Label>
            <Textarea
              id="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="min-h-[100px] bg-gray-50"
            />
          </div>
        </div>

        <div className="mt-10 mb-6">
          <h2 className="text-xl font-semibold">Make The Course</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">
              What you will teach in this course
            </h3>
            {teachingPoints.map((point, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    value={point}
                    onChange={(e) =>
                      handleTeachingPointChange(index, e.target.value)
                    }
                    placeholder="What you will teach in this course..."
                    className="pr-16 bg-gray-50"
                    maxLength={120}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    {point.length}/120
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Course Requirement</h3>
            {requirements.map((requirement, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    value={requirement}
                    onChange={(e) =>
                      handleRequirementChange(index, e.target.value)
                    }
                    placeholder="What is your course requirement..."
                    className="pr-16 bg-gray-50"
                    maxLength={120}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    {requirement.length}/120
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 pt-5 flex justify-end">
            <Link to={"/teacher/courses/createCourses/addchapters"}>
              <Button className="bg-green-500 hover:bg-green-600 ">Next</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
