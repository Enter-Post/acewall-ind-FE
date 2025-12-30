import React, { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { z } from "zod";
import { FileIcon, Loader, Upload, X } from "lucide-react";
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
import SubCategorySelect from "@/CustomComponent/CreateCourse/SubCategorySelect";
import TeachingPointInput from "@/CustomComponent/CreateCourse/TeachingPoints";
import RequirementInput from "@/CustomComponent/CreateCourse/Requirment";
import AiContentModal from "@/CustomComponent/teacher/teacher/AiContentModal";

const documentSchema = z.object({
  file: z.any().refine((file) => file instanceof File, {
    message: "Document file is required",
  }),
});

const courseFormSchema = z.object({
  thumbnail: z.any().refine((file) => file instanceof File, {
    message: "Thumbnail is required",
  }),
  courseTitle: z
    .string()
    .min(5, { message: "Course title must be at least 5 characters" })
    .max(100, { message: "Course title must be less than 100 characters" }),
  category: z
    .string()
    .min(1, { message: "Please select a category" })
    .refine((val) => val !== "", { message: "Please select a category" }),
  subcategory: z
    .string()
    .min(1, { message: "Please select a subcategory" })
    .refine((val) => val !== "", { message: "Please select a subcategory" }),
  semesterbased: z.boolean(),
  language: z
    .string()
    .min(1, { message: "Please select a language" })
    .refine((val) => val !== "", { message: "Please select a language" }),
  courseDescription: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" })
    .max(4000, { message: "Description must be less than 2500 characters" }),
  teachingPoints: z
    .array(
      z.object({
        value: z
          .string()
          .min(5, "Min 5 characters.")
          .max(120, "Max 120 characters."),
      })
    )
    .min(1, { message: "Add at least one teaching point." }),
  requirements: z
    .array(
      z.object({
        value: z
          .string()
          .min(5, "Min 5 characters.")
          .max(120, "Max 120 characters."),
      })
    )
    .min(1, { message: "Add at least one requirement." }),
  price: z
    .string()
    .refine((val) => val !== "" && !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a valid non-negative number",
    })
    .refine((val) => Number(val) <= 9999, {
      message: "Price must not exceed 4 digits",
    }),
});

export default function CoursesBasis() {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [aiResponse, setAiResponse] = useState({
    content: "",
    usedfor: "",
  });
  const { user } = useContext(GlobalContext);
  const { course, setCourse } = useContext(CourseContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axiosInstance
      .get("subcategory/get")
      .then((res) => {
        console.log("subcategroy", res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("category/get")
      .then((res) => {
        console.log("category", res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      courseTitle: "",
      category: "",
      subcategory: "",
      language: "english",
      courseDescription: "",
      teachingPoints: [{ value: "" }],
      requirements: [{ value: "" }],
    },
  });
  const watchedLanguage = watch("language");
  const watchedSemesterbased = watch("semesterbased");
  const watchRequirement = watch("requirements");
  const watchteacherpoints = watch("teachingPoints");
  const watchedDescription = watch("courseDescription");
  console.log(errors, "errors");

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

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG and PNG images are allowed.");
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    setValue("thumbnail", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    setLoading(true);
    try {
      formData.append("thumbnail", data.thumbnail);
      formData.append("courseTitle", data.courseTitle);
      formData.append("category", data.category);
      formData.append("subcategory", data.subcategory);
      formData.append("semesterbased", data.semesterbased);
      formData.append("courseDescription", data.courseDescription);
      formData.append(
        "teachingPoints",
        JSON.stringify(data.teachingPoints.map((tp) => tp.value))
      );
      formData.append(
        "requirements",
        JSON.stringify(data.requirements.map((req) => req.value))
      );
      formData.append("price", data.price);

      const res = await axiosInstance.post("course/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Course created successfully!");

      reset();
      navigate("/teacher/courses");
    } catch (err) {
      console.log(err, "error");
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  function DocumentUpload({ label, name, register, setValue, error }) {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF, JPEG, JPG, and PNG files are allowed.");
        return;
      }

      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSizeInBytes) {
        toast.error("File size must be less than 2MB.");
        return;
      }

      console.log(name.replace(".file", ""), "name.replace");
      setValue(name.replace(".file", ""), file, { shouldValidate: true });

      setCourseDocument((prev) => ({
        ...prev,
        [name.split(".")[1]]: file,
      }));
    };

    return (
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-shrink-0">
          <Label htmlFor={name}>{label}</Label>
        </div>
        <div className="w-full">
          <input
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/jpg"
            className="mt-2 border border-gray-300 rounded-md px-3 py-2 w-full"
            id={name}
            onChange={handleFileChange}
          />

          {courseDocument && (
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
              <FileIcon size={16} />
              {courseDocument[name.split(".")[1]]
                ? courseDocument[name.split(".")[1]].name
                : "No file selected"}
              {courseDocument[name.split(".")[1]] && (
                <X
                  size={16}
                  className="text-red-500"
                  onClick={() => {
                    setCourseDocument((prev) => ({
                      ...prev,
                      [name.split(".")[1]]: null,
                    }));
                    setValue(name, null);
                  }}
                />
              )}
            </p>
          )}
        </div>
      </div>
    );
  }

  const onError = (errors) => {
    toast.error("Please fill out all required fields correctly.");
    console.log(errors);
  };

  return (
    <div role="main" aria-labelledby="create-course-heading">
      <h1
        id="create-course-heading"
        className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg"
      >
        Create Course
      </h1>

      <p id="form-instructions" className="sr-only">
        All fields marked with an asterisk are required.
      </p>

      <FormProvider
        {...{
          register,
          handleSubmit,
          control,
          setValue,
          reset,
          formState: { errors, isSubmitting },
          watch,
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-8"
          noValidate
          aria-describedby="form-instructions"
        >
          <section>
            <div className="space-y-6">
              {/* Thumbnail */}
              <div>
                <Label htmlFor="thumbnailInput" className="block mb-2">
                  Thumbnail *
                </Label>

                {errors?.thumbnail && (
                  <p
                    role="alert"
                    className="text-xs text-red-500 mt-1"
                    id="thumbnail-error"
                  >
                    {errors.thumbnail.message}
                  </p>
                )}

                <div className="border-2 border-dashed border-gray-300 rounded-md p-1 w-full max-w-md">
                  {thumbnailPreview ? (
                    <div className="relative">
                      <img
                        src={thumbnailPreview || "/placeholder.svg"}
                        alt="Selected course thumbnail preview"
                        className="w-full h-[300px] object-cover rounded"
                      />
                      <div className="absolute bottom-2 right-2 flex space-x-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="bg-white hover:bg-gray-100 text-red-500"
                          aria-label="Remove thumbnail"
                          onClick={() => {
                            setThumbnailPreview(null);
                            setValue("thumbnail", null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : loading ? (
                    <section
                      className="flex justify-center items-center h-[300px]"
                      aria-live="polite"
                      aria-busy="true"
                    >
                      <Loader size={48} className="animate-spin" />
                    </section>
                  ) : (
                    <div className="flex items-center justify-center h-[300px]">
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        id="thumbnailInput"
                        className="sr-only"
                        aria-invalid={!!errors.thumbnail}
                        aria-describedby={
                          errors.thumbnail ? "thumbnail-error" : undefined
                        }
                        onChange={handleThumbnailChange}
                      />
                      <label
                        htmlFor="thumbnailInput"
                        role="button"
                        tabIndex={0}
                        aria-label="Upload course thumbnail"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            document.getElementById("thumbnailInput")?.click();
                          }
                        }}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
                      >
                        <Upload size={16} />
                        Upload Thumbnail
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Course Title & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="courseTitle" className="block mb-2">
                    Course Title *
                  </Label>
                  <Input
                    id="courseTitle"
                    maxLength={50}
                    aria-invalid={!!errors.courseTitle}
                    aria-describedby={
                      errors.courseTitle ? "courseTitle-error" : undefined
                    }
                    className={`bg-gray-50 ${
                      errors.courseTitle ? "border border-red-500" : ""
                    }`}
                    {...register("courseTitle")}
                  />
                  {errors.courseTitle && (
                    <p
                      id="courseTitle-error"
                      role="alert"
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.courseTitle.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="price" className="block mb-2">
                    Course Price (USD)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    max="9999"
                    placeholder="Enter course price"
                    aria-invalid={!!errors.price}
                    aria-describedby={errors.price ? "price-error" : undefined}
                    className={`bg-gray-50 ${
                      errors.price ? "border border-red-500" : ""
                    }`}
                    onInput={(e) => {
                      const value = parseFloat(e.currentTarget.value);
                      if (value > 9999) e.currentTarget.value = "9999";
                    }}
                    {...register("price")}
                  />
                  {errors.price && (
                    <p
                      id="price-error"
                      role="alert"
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.price.message}
                    </p>
                  )}
                </div>

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

              {/* Semester & Language */}
              <section className="flex gap-6 justify-between">
                <div>
                  <Label className="block mb-2">
                    Is this a semester-based course *
                  </Label>
                  <Select
                    aria-required="true"
                    aria-invalid={!!errors.semesterbased}
                    onValueChange={(value) =>
                      setValue("semesterbased", value === "true", {
                        shouldValidate: true,
                      })
                    }
                    value={
                      watchedSemesterbased !== undefined
                        ? watchedSemesterbased
                          ? "true"
                          : "false"
                        : undefined
                    }
                  >
                    <SelectTrigger className="bg-gray-50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.semesterbased && (
                    <p role="alert" className="text-xs text-red-500 mt-1">
                      {errors.semesterbased.message}
                    </p>
                  )}
                </div>

                <div className="w-[50%]">
                  <Label className="block mb-2">Language *</Label>
                  <Select
                    aria-required="true"
                    aria-invalid={!!errors.language}
                    onValueChange={(value) =>
                      setValue("language", value, { shouldValidate: true })
                    }
                    value={watchedLanguage}
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
                  {errors.language && (
                    <p role="alert" className="text-xs text-red-500 mt-1">
                      {errors.language.message}
                    </p>
                  )}
                </div>
              </section>

              {/* Description */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <Label htmlFor="courseDescription">
                    Course Description *
                  </Label>
                  <AiModal
                    command={watchedDescription}
                    aiResponse={aiResponse}
                    setAiResponse={setAiResponse}
                    usedfor="courseDescription"
                    setValue={setValue}
                  />
                </div>
                <Textarea
                  id="courseDescription"
                  aria-required="true"
                  className={`bg-gray-50 min-h-[100px] ${
                    errors.courseDescription ? "border-red-500" : ""
                  }`}
                  maxLength={4000}
                  {...register("courseDescription")}
                />
                <div className="m-3"></div>

                {errors.courseDescription && (
                  <p className="text-xs text-red-600" role="alert">
                    {errors.courseDescription.message}
                  </p>
                )}
              </div>
            </div>

            {/* Teaching Points */}
            {/* Teaching Points */}
            <section className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium mb-3">
                  What you will teach *
                </h2>
                <div className="m-3">
                  <AiContentModal
                    aiResponse={aiResponse}
                    setAiResponse={setAiResponse}
                    usedfor="teachingPoints"
                    appendTeachingPoint={appendTeachingPoint}
                    removeTeachingPoint={removeTeachingPoint}
                    prevPoints={watchteacherpoints}
                  />
                </div>
              </div>

              {teachingPointsFields.map((field, index) => (
                <TeachingPointInput
                  key={field.id}
                  field={field}
                  index={index}
                  teachingPointsFields={teachingPointsFields}
                  remove={removeTeachingPoint}
                  error={errors.teachingPoints?.[index]?.value}
                  control={control}
                  register={register}
                />
              ))}

              <Button
                type="button"
                className="mt-3"
                disabled={teachingPointsFields.length >= 10}
                onClick={() => appendTeachingPoint({ value: "" })}
              >
                + Add Teaching Point
              </Button>
            </section>

            {/* Requirements */}
            <section className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium mb-3">
                  Course Requirements *
                </h2>
                <div className="">
                  <AiContentModal
                    aiResponse={aiResponse}
                    setAiResponse={setAiResponse}
                    usedfor="requirements"
                    appendRequirement={appendRequirement}
                    removeRequirement={removeRequirement}
                    prevPoints={watchRequirement}
                  />
                </div>
              </div>

              {requirementsFields.map((field, index) => (
                <RequirementInput
                  key={field.id}
                  field={field}
                  index={index}
                  requirementsFields={requirementsFields}
                  remove={removeRequirement}
                  error={errors.requirements?.[index]?.value}
                  register={register}
                />
              ))}

              <Button
                type="button"
                className="mt-3"
                disabled={requirementsFields.length >= 10}
                onClick={() => appendRequirement({ value: "" })}
              >
                + Add Requirement
              </Button>
            </section>
          </section>

          {/* Submit */}
          <div className="flex justify-end mt-10">
            <Button
              type="submit"
              aria-busy={loading}
              aria-disabled={loading}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
