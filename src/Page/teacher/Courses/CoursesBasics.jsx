import React, { useContext, useEffect, useState } from "react";
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
import { GlobalContext } from "@/Context/GlobalProvider";
import { axiosInstance } from "@/lib/AxiosInstance";
import { toast } from "sonner";
import SubCategorySelect from "@/CustomComponent/CreateCourse/subCategorySelect";

// Define the form schema with Zod

const courseFormSchema = z.object({
  thumbnail: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Thumbnail is required",
    })
    .refine((file) => !!file && file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    }),

  courseTitle: z
    .string()
    .min(5, { message: "Course title must be at least 5 characters" })
    .max(100, { message: "Course title must be less than 100 characters" }),
  category: z.string({
    required_error: "Please select a category",
  }),
  subcategory: z.string({
    required_error: "Please select a subcategory",
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
});

export default function CoursesBasis() {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

  const { user } = useContext(GlobalContext);
  const { course, setCourse } = useContext(CourseContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedsubCategory, setSubSelectedCategory] = useState("");


  useEffect(() => {
    axiosInstance.get("subcategory/get")
      .then(res => {
        console.log("subcategroy", res.data);
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get("category/get")
      .then(res => {
        console.log("category", res.data);
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);




  useEffect(() => {
    setDescription(watch("courseDescription") || "");
  }, []);

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
      subcategory: "",
      language: "",
      courseDescription: "",
      teachingPoints: [{ value: "" }],
      requirements: [{ value: "" }],
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
    if (!file) return;

    // ✅ Validate MIME type for JPEG and PNG only
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPEG and PNG image files are allowed.");
      return;
    }

    // ✅ Validate file size (max 2MB)
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeInBytes) {
      alert("Image size must be less than 2MB.");
      return;
    }

    // ✅ Set file in form state
    setValue("thumbnail", file);

    // ✅ Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const onSubmit = async (data) => {
    const formData = new FormData();
    setLoading(true);

    formData.append("thumbnail", data.thumbnail);
    formData.append("courseTitle", data.courseTitle);
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("language", data.language);
    formData.append("courseDescription", data.courseDescription);
    formData.append("teachingPoints", JSON.stringify(data.teachingPoints));
    formData.append("requirements", JSON.stringify(data.requirements));

    await axiosInstance
      .post("/course/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res, "res");
        toast.success(res.data.message);
        navigate("/teacher/courses");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading(false);
      });
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
              <div className={` p-1 w-full max-w-md ${errors.thumbnail ? "border-red-500" : "border-gray-300"
                }`}></div>
              {errors?.thumbnail && (
                <p className="text-xs text-red-500 mt-1">
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
                        onClick={() => {
                          setThumbnailPreview(null);
                          setValue("thumbnail", null); // Reset form value
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : loading ? (
                  <section className="flex justify-center items-center h-[300px]">
                    <Loader size={48} className="animate-spin" />
                  </section>
                ) : (
                  <div className="flex items-center justify-center h-[300px]">
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      id="thumbnailInput"
                      onChange={handleThumbnailChange}
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
                  className={`bg-gray-50 ${errors.courseTitle ? "border border-red-500" : ""}`}
                  {...register("courseTitle")}
                />
                {errors.courseTitle && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.courseTitle.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <CategorySelect
                register={register}
                errors={errors}
                onCategoryChange={(value) => setSelectedCategory(value)}
              />

              <SubCategorySelect
                register={register}
                errors={errors}
                selectedCategory={selectedCategory}
              />
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
                className={`min-h-[100px] bg-gray-50  ${errors.courseTitle ? "border border-red-500" : ""}`}
                maxLength={500}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setValue("courseDescription", e.target.value, {
                    shouldValidate: true,
                  });
                }}
              />
              <div className="text-sm text-gray-500 mt-1">
                {description.length}/500 characters
              </div>
              {errors.courseDescription && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.courseDescription.message}
                </p>
              )}
            </div>

          </div>

          <div className="mt-10 mb-6">
            <h2 className="text-xl font-semibold">Make The Course</h2>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">
              What you will teach in this course <span className="text-gray-500 text-xs">(max 6)</span>
            </h3>

            {teachingPointsFields.map((field, index) => (
              <div key={field.id} className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-2 gap-2 w-[100%]">
                  <Input
                    {...register(`teachingPoints.${index}.value`)}
                    placeholder="What you will teach in this course... "
                    className={'pr-16 bg-gray-50 w-full relative  ${errors.courseTitle ? "border border-red-500" : ""} '}
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
                  value={`${watch(`teachingPoints.${index}.value`)?.length || 0
                    }/100`}
                  readOnly
                  className={`pr-16 bg-gray-50 w-full relative ${errors.teachingPoints?.[index]?.value ? "border border-red-500" : ""
                    }`} />
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
              onClick={() => teachingPointsFields.length < 6 && appendTeachingPoint({ value: "" })}
              className="mt-2"
              disabled={teachingPointsFields.length >= 6} // Disable if there are 6 items
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
            <h3 className="text-lg font-medium mb-4">Course Requirements <span className="text-gray-500 text-xs">(max 6)</span></h3>

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
                    className={`pr-16 bg-gray-50 w-full relative ${errors.teachingPoints?.[index]?.value ? "border border-red-500" : ""
                      }`} maxLength={120}
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
              onClick={() => requirementsFields.length < 6 && appendRequirement({ value: "" })}
              className="mt-2"
              disabled={requirementsFields.length >= 6} // Disable if there are 6 items
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

