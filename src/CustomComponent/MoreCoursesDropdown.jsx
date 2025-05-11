import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@/Context/GlobalProvider";

const MoreCoursesDropdown = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const { setSelectedSubcategoryId } = useContext(GlobalContext);



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category/get");
        if (response.data?.categories) {
          console.log('response.data?.categories',response.data?.categories)
          setCategories(response.data.categories);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const subcategory = async (_id) => {
    try {
      const response = await axiosInstance.get(`/category/subcategories/${_id}`);
      if (response.data?.subcategories) {
        console.log('subCategoriesMap',subCategoriesMap);
        setSubCategoriesMap((prev) => ({
          ...prev,
          [_id]: response.data.subcategories,
          
        }));
      } else {
        console.error("Invalid response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
  
  const handleNavigate = (categoryId, subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId); 
    navigate(`/courses/${categoryId}/${subcategoryId}`); 
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          // variant="ghost"
          className="text-xs md:text-md lg:text-base font-medium text-gray-700 flex items-center  gap-3  "
        >
          MORE COURSES
          <ChevronDown className="w-4 h-4 transition-transform duration-300" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="grid grid-row-8 gap-2">
        {categories.length > 0 ? (
          categories.map((category) => (
            <DropdownMenuSub key={category._id}>
            <DropdownMenuSubTrigger onMouseEnter={() => subcategory(category._id)}>
              {category.title}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {subCategoriesMap[category._id]?.length > 0 ? (
                subCategoriesMap[category._id].map((sub) => (
                  <DropdownMenuItem
                    key={sub._id}
                    onClick={() => handleNavigate(category._id, sub._id)}
                    className="cursor-pointer"
                  >
                    {sub.title}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>Loading or no subcategories</DropdownMenuItem>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          
          ))
        ) : (
          <DropdownMenuItem disabled>No categories available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreCoursesDropdown;
