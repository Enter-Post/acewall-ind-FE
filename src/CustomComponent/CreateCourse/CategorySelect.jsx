import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/AxiosInstance";
import React, { useEffect, useState } from "react";

const CategorySelect = ({ register, errors }) => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    const getcategory = async () => {
      await axiosInstance
        .get("category/get")
        .then((res) => {
          setCategories(res.data.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getcategory();
  }, []);

  return (
    <div>
      <Label htmlFor="category" className="block mb-2">
        Category
      </Label>
      <Select
        onValueChange={(value) => {
          const event = { target: { name: "category", value } };
          register("category").onChange(event);
        }}
      >
        <SelectTrigger className="bg-gray-50">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((value, index) => {
            return (
              <SelectItem key={value._id} value={value._id}>
                {value.title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <input type="hidden" {...register("category")} />
      {errors.category && (
        <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
      )}
    </div>
  );
};

export default CategorySelect;
