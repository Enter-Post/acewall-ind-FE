import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Plus, RefreshCw, Check } from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "@/CustomComponent/BackButton";

const isScaleComplete = (grades) => {
  const sorted = [...grades].sort((a, b) => a.min - b.min);
  return (
    sorted.length > 0 &&
    sorted[0].min === 0 &&
    sorted[sorted.length - 1].max === 100
  );
};

export default function ManageGradeScale() {
  const { courseId } = useParams();
  const [grades, setGrades] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      grade: "",
      min: 90,
      max: 100,
    },
  });

  const watchMin = watch("min");
  const gradescale = grades.reduce((acc, g) => acc + (g.max - g.min), 0); // Don't use +1
  const isComplete = isScaleComplete(grades);

  const handleCreateGradeScale = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        `gradebook/gradingScale/${courseId}`,
        { scale: grades }
      );
      toast.success(res.data.message);
      navigate(`/teacher/courses/gradescale/${courseId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    const newMin = parseFloat(data.min);
    const newMax = parseFloat(data.max);

    if (newMin >= newMax) {
      toast.error("Min must be less than Max.");
      return;
    }

    if (newMin < 0 || newMax > 100) {
      toast.error("Values must be within 0 to 100.");
      return;
    }

    const hasOverlap = grades.some(
      (g) =>
        (newMin >= g.min && newMin < g.max) ||
        (newMax > g.min && newMax <= g.max) ||
        (newMin <= g.min && newMax >= g.max)
    );

    if (hasOverlap) {
      toast.error("This range overlaps with an existing grade.");
      return;
    }

    const newEntry = {
      grade: data.grade.toUpperCase(),
      min: newMin,
      max: newMax,
    };

    const updatedGrades = [...grades, newEntry].sort((a, b) => b.max - a.max);
    setGrades(updatedGrades);
    setSuccessMessage(
      `Grade ${newEntry.grade} added: ${newMax}% to ${newMin}%`
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    reset({
      grade: "",
      min:
        parseFloat((newMin - 10).toFixed(2)) >= 0
          ? parseFloat((newMin - 10).toFixed(2))
          : 0,
      max: parseFloat((newMin - 0.01).toFixed(2)),
    });
  };

  const handleReset = () => {
    setGrades([]);
    reset({
      grade: "",
      min: 90,
      max: 100,
    });
    setSuccessMessage("");
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <BackButton />
      <h1 className="text-2xl font-bold text-center mb-6">
        Create Grade Scale
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium">
                  Letter Grade
                </label>
                <Input
                  {...register("grade", {
                    required: "Grade is required",
                    pattern: {
                      value: /^[A-F+-]*$/i,
                      message: "Only letters A-F and +/- symbols allowed",
                    },
                  })}
                  placeholder="e.g., A, B+, C-"
                  className={errors.grade ? "border-red-500" : ""}
                />
                {errors.grade && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.grade.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium">Min %</label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register("min", {
                      required: "Min is required",
                      min: { value: 0, message: "Min must be at least 0" },
                      max: { value: 99.99, message: "Min must be below 100" },
                    })}
                    className={errors.min ? "border-red-500" : ""}
                  />
                  {errors.min && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.min.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium">Max %</label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register("max", {
                      required: "Max is required",
                      min: {
                        value: watchMin ? Number(watchMin) + 0.01 : 0.01,
                        message: "Max must be greater than Min",
                      },
                      max: { value: 100, message: "Max cannot exceed 100" },
                    })}
                    className={errors.max ? "border-red-500" : ""}
                  />
                  {errors.max && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.max.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Grade
                </Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </form>

            {successMessage && (
              <Alert className="mt-4 bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">
                  {successMessage}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Grade Scale Display */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Scale</CardTitle>
          </CardHeader>
          <CardContent>
            {grades.length > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 font-medium text-sm text-gray-500 mb-2">
                  <div>Grade</div>
                  <div>Range</div>
                  <div>Percentage</div>
                </div>
                {grades.map((grade, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-2 items-center border-b border-gray-100 pb-2"
                  >
                    <Badge className="font-bold text-sm px-3 py-1 bg-green-500">
                      {grade.grade}
                    </Badge>
                    <div className="text-sm">
                      {grade.min}% - {grade.max}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${grade.max - grade.min}%` }}
                      ></div>
                    </div>
                  </div>
                ))}

                {isComplete ? (
                  <>
                    <Alert className="mt-4 bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-600">
                        Grade scale completed (0% to 100%)!
                      </AlertDescription>
                    </Alert>

                    <Button
                      onClick={handleCreateGradeScale}
                      className="mt-4 w-full bg-green-500 hover:bg-green-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating..." : "Create"}
                    </Button>
                  </>
                ) : (
                  <Alert className="mt-4 bg-yellow-50 border-yellow-200">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-700">
                      Grade scale is incomplete. Some % ranges (like 90.01%) may
                      be missing.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center text-gray-500">
                <AlertCircle className="h-8 w-8 mb-2 opacity-50" />
                <p>No grades added yet</p>
                <p className="text-sm">Add grades using the form</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
