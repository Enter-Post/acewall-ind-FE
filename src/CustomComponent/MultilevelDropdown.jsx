import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const MultiLevelDropdown = ({ label, items }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 font-medium hover:text-primary">
        {label} <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.subItems ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center justify-between">
                  {item.label}
                  {/* <ChevronRight className="h-4 w-4" /> */}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-56">
                    {item.subItems.map((subItem, subIndex) => (
                      <React.Fragment key={subIndex}>
                        {subItem.subItems ? (
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center justify-between">
                              {subItem.label}
                              <ChevronRight className="h-4 w-4" />
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="w-56">
                                {subItem.subItems.map(
                                  (courseItem, courseIndex) => (
                                    <Link
                                      className="border border-red-600"
                                      to={"/Courses"}
                                      key={courseIndex}
                                    >
                                      <DropdownMenuItem
                                        key={courseIndex}
                                        onClick={() =>
                                          handleCourseClick(courseItem)
                                        }
                                      >
                                        {courseItem.label}
                                      </DropdownMenuItem>
                                    </Link>
                                  )
                                )}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleCourseClick(subItem)}
                          >
                            {subItem.label}
                          </DropdownMenuItem>
                        )}
                      </React.Fragment>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem onClick={() => handleCourseClick(item)}>
                {item.label}
              </DropdownMenuItem>
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
