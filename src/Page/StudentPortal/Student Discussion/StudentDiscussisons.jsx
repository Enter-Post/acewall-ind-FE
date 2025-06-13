import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateDiscussionDialog } from "@/CustomComponent/createDiscussionModal";
import DiscussionTabContent from "@/CustomComponent/Student/DiscussionTabContent";
import { axiosInstance } from "@/lib/AxiosInstance";
import { cn } from "@/lib/utils";
import { Tabs } from "@radix-ui/react-tabs";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentDiscussion = () => {
  const [loading, setloading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [publicDiscussions, setPublicDiscussions] = useState([]);
  const [courseDiscussions, setCourseDiscussions] = useState([]);

  console.log("public", publicDiscussions);
  console.log("course", courseDiscussions);
  useEffect(() => {
    const fetchDiscussions = async () => {
      setloading(true);
      await axiosInstance
        .get("/discussion/studentDiscussion")
        .then((res) => {
          setloading(false);
          setCourseDiscussions(res.data.discussion);
          setPublicDiscussions(res.data.publicDiscussion);
        })
        .catch((err) => {
          setloading(false);
          setCourseDiscussions([]);
          setPublicDiscussions([]);
        });
    };
    fetchDiscussions();
  }, [refresh]);

  const [activeTab, setActiveTab] = useState("course");

  return (
    <div>
      <div className="flex flex-col pb-2 gap-5">
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
          Discussions
        </p>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger
            value="course"
            className={cn(
              "px-4 py-2 rounded-lg",
              activeTab === "course" ? "bg-green-600 text-black" : ""
            )}
          >
            Course Discussions
          </TabsTrigger>
          <TabsTrigger
            value="public"
            className={cn(
              "px-4 py-2 rounded-lg",
              activeTab === "public" ? "bg-green-600 text-black" : ""
            )}
          >
            Public Discussions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="course">
          <DiscussionTabContent
            loading={loading}
            discussions={courseDiscussions}
          />
        </TabsContent>
        <TabsContent value="public">
          <DiscussionTabContent
            loading={loading}
            discussions={publicDiscussions}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDiscussion;
