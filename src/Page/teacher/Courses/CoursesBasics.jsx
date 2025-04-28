import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Loader, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useNavigate } from "react-router-dom";
import { CourseContext } from "@/Context/CoursesProvider";
import CategorySelect from "@/CustomComponent/CreateCourse/CategorySelect";
import axios from "axios";
import { GlobalContext } from "@/Context/GlobalProvider";

// Define the form schema with Zod
const courseFormSchema = z.object({
  thumbnail: z.any(),
  courseTitle: z
    .string()
    .min(5, { message: "Course title must be at least 5 characters" })
    .max(100, { message: "Course title must be less than 100 characters" }),
  category: z.string({
    required_error: "Please select a category",
  }),
  language: z.string({
    required_error: "Please select a language",
  }),
  courseDescription: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),
  teachingPoints: z
    .array(
      z.object({
        value: z
          .string()
          .min(5, { message: "Teaching point must be at least 5 characters" })
          .max(120, {
            message: "Teaching point must be less than 120 characters",
          }),
      })
    )
    .min(1, { message: "Add at least one teaching point" }),
  requirements: z
    .array(
      z.object({
        value: z
          .string()
          .min(5, { message: "Requirement must be at least 5 characters" })
          .max(120, {
            message: "Requirement must be less than 120 characters",
          }),
      })
    )
    .min(1, { message: "Add at least one requirement" }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a non-negative number",
    }),
});

export default function CoursesBasis() {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);
  const { course, setCourse } = useContext(CourseContext);
  // Initialize the form with React Hook Form

  // console.log(thumbnail, "thumbnail");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      courseTitle: "",
      category: "",
      language: "",
      courseDescription: "",
      teachingPoints: [{ value: "" }],
      requirements: [{ value: "" }],
      price: "",
    },
  });

  console.log(errors, "errors");

  // Set up field arrays for teaching points and requirements,
  const {
    fields: teachingPointsFields,
    append: appendTeachingPoint,
    remove: removeTeachingPoint,
  } = useFieldArray({
    control,
    name: "teachingPoints",
  });

  const {
    fields: requirementsFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    control,
    name: "requirements",
  });

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    setValue("thumbnail", file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnailPreview(reader.result); // This will be the Base64 image data
      };

      reader.readAsDataURL(file); // Read file as Base64 URL
    }
  };

  // Handle thumbnail change
  // const handleThumbnailChange = async (e) => {
  //   setLoading(true);
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   if (file) {
  //     const file = event.target.files[0];
  //     const data = new FormData();
  //     data.append("file", file);
  //     data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
  //     data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

  //     const res = await axios.post(
  //       `https://api.cloudinary.com/v1_1/${
  //         import.meta.env.VITE_CLOUD_NAME
  //       }/image/upload`,
  //       data
  //     );
  //     // console.log(res.data.url, "cloudnary");
  //     setLoading(false);

  //     setValue("thumbnail", res.data.url, { shouldValidate: true });
  //     setThumbnailPreview(URL.createObjectURL(file)); // for preview
  //   }
  // };

  // Handle form submission

  const onSubmit = (data) => {
    console.log(data, "data in onSubmit");

    if (data) {
      navigate("/teacher/courses/createCourses/addchapters");
      setCourse({
        ...course,
        basics: data,
        // chapters: [], createdby: user._id
      });
      console.log(course, "data");
    }
  };

  return (
    <div>
      <h1>Create New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section>
          <div className="space-y-6">
            <div>
              <Label htmlFor="thumbnail" className="block mb-2">
                Thumbnail
              </Label>
              {errors?.thumbnail && (
                <p className="text-xs text-red-600">
                  {errors.thumbnail.message}
                </p>
              )}
              <div className="border-2 border-dashed border-gray-300 rounded-md p-1 w-full max-w-md">
                {thumbnailPreview ? (
                  <div className="relative">
                    <img
                      src={thumbnailPreview || "/placeholder.svg"}
                      alt="Course thumbnail"
                      className="w-full h-[300px] object-cover rounded"
                    />
                    <div className="absolute bottom-2 right-2 flex space-x-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="bg-white hover:bg-gray-100 text-red-500"
                        onClick={() => setThumbnailPreview(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : loading ? (
                  <div>
                    <section className="flex justify-center items-center">
                      <Loader size={48} className={"animate-spin"} />
                    </section>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[300px]">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="thumbnailInput"
                      onChange={(e) => handleThumbnailChange(e)}
                    />
                    <label htmlFor="thumbnailInput">
                      <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all cursor-pointer">
                        <Upload size={16} />
                        Upload Thumbnail
                      </div>
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
                  className="bg-gray-50"
                  {...register("courseTitle")}
                />
                {errors.courseTitle && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.courseTitle.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <CategorySelect register={register} errors={errors} />
            </div>

            <div>
              <Label htmlFor="language" className="block mb-2">
                Language
              </Label>
              <Select
                onValueChange={(value) => {
                  const event = { target: { name: "language", value } };
                  register("language").onChange(event);
                }}
                className="max-w-xs"
              >
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
              <input type="hidden" {...register("language")} />
              {errors.language && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.language.message}
                </p>
              )}
            </div>

            <div className="">
              <Label htmlFor="courseDescription" className="block mb-2">
                Course Description
              </Label>
              <Textarea
                id="courseDescription"
                className="min-h-[100px] bg-gray-50"
                {...register("courseDescription")}
              />
              {errors.courseDescription && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.courseDescription.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="price" className="block mb-2">
                Price (in USD)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 19.99"
                className="bg-gray-50"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 mb-6">
            <h2 className="text-xl font-semibold">Make The Course</h2>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">
              What you will teach in this course
            </h3>

            {teachingPointsFields.map((field, index) => (
              <div key={field.id} className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className=" flex flex-2 gap-2 w-[100%]">
                  <Input
                    {...register(`teachingPoints.${index}.value`)}
                    placeholder="What you will teach in this course... "
                    className="pr-16 bg-gray-50 w-full relative "
                    maxLength={120}
                  />

                  {teachingPointsFields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTeachingPoint(index)}
                      className="text-red-500 cursor-pointer"
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <input
                  type="text"
                  value={`${
                    watch(`teachingPoints.${index}.value`)?.length || 0
                  }/120`}
                  readOnly
                  className="text-sm text-gray-500 bg-transparent border-none"
                />
                {errors.teachingPoints?.[index]?.value && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.teachingPoints[index]?.value?.message}
                  </p>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendTeachingPoint({ value: "" })}
              className="mt-2"
            >
              Add Teaching Point
            </Button>

            {errors.teachingPoints && !Array.isArray(errors.teachingPoints) && (
              <p className="text-xs text-red-500 mt-1">
                {errors.teachingPoints.message}
              </p>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Course Requirements</h3>

            {requirementsFields.map((field, index) => (
              <div key={field.id} className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-2 gap-2 w-[100%]">
                  <Input
                    {...register(`requirements.${index}.value`)}
                    placeholder="What is your course requirement..."
                    className="pr-16 bg-gray-50 w-full relative "
                    maxLength={120}
                  />

                  {requirementsFields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                      className="text-red-500 cursor-pointer"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                {errors.requirements?.[index]?.value && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.requirements[index]?.value?.message}
                  </p>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendRequirement({ value: "" })}
              className="mt-2"
            >
              Add Requirement
            </Button>

            {errors.requirements && !Array.isArray(errors.requirements) && (
              <p className="text-xs text-red-500 mt-1">
                {errors.requirements.message}
              </p>
            )}
          </div>
        </section>

        <div className="flex justify-end gap-4 mt-10">
          <Button type="submit" className={"bg-green-500 hover:bg-green-600"}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
