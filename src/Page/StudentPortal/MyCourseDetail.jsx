import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Play,
  Pause,
  Volume2,
  Maximize2,
  Square,
  Download,
  MessageCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const sectionsData = [
  { name: "Getting Started", lectures: 4 },
  { name: "Secret of Good Design", lectures: 52 },
  { name: "Practice Design Like an Artist", lectures: 43 },
  { name: "Web Development (workflow)", lectures: 35 },
  { name: "Secrets of Making Money Freelancing", lectures: 21 },
  { name: "Advanced", lectures: 39 },
  { name: "What's Next", lectures: 7 },
];

export default function MyCourseDetail() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedSections, setExpandedSections] = useState(
    sectionsData.reduce((acc, section) => {
      acc[section.name] = false;
      return acc;
    }, {})
  );
  const [activeTab, setActiveTab] = useState("description");

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Left side - Video and Content */}
      <div className="flex-1 overflow-auto">
        {/* Video Player */}
        <div className="relative bg-black">
          <div className="aspect-video relative">
            <img
              src="/placeholder.svg?height=480&width=854"
              alt="Course video"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Video Controls */}
          <div className="flex items-center justify-between p-2 bg-black text-white">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay}>
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              <span className="text-xs">1:25 / 9:15</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <Square className="w-4 h-4" />
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Course Title */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-semibold">2. Sign up in Webflow</h1>
          <div className="flex items-center mt-2">
            <div className="ml-auto flex items-center text-xs text-gray-500">
              <span className="mx-4">Comments: 154</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="description"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="border-b overflow-auto hide-scrollbar">
            <TabsList className="bg-transparent h-12">
              {["description", "notes", "file", "comments"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`px-6 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:shadow-none rounded-none h-full`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="description" className="p-6">
            <h2 className="font-semibold text-lg mb-4">Lectures Description</h2>
            <p className="text-gray-700 mb-4">
              We cover everything you need to know about this website. From
              creating your first project to publishing your website, we'll go
              through all the steps together and show you how to use Webflow.
            </p>
            <p className="text-gray-700 mb-4">
              If we have a lot of videos, we'll break them down into smaller
              chunks for easier follow-along.
            </p>
          </TabsContent>

          <TabsContent value="notes" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">Lecture Notes</h2>
              <Button
                variant="outline"
                size="sm"
                className="text-green-500 border-green-500 hover:bg-green-50"
              >
                <Download className="w-4 h-4 mr-2" /> Download Notes
              </Button>
            </div>
            <div className="prose max-w-none">
              <p>Lecture notes content here...</p>
            </div>
          </TabsContent>

          <TabsContent value="file" className="p-6">
            <h2 className="font-semibold text-lg mb-4">Attach Files (01)</h2>
            <div className="border rounded-md p-4 flex items-center">
              <div className="bg-green-100 text-green-500 p-2 rounded mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Create account on Webflow.pdf</h3>
                <p className="text-sm text-gray-500">12.5 MB</p>
              </div>
              <Button className="bg-green-500 hover:bg-green-600">
                Download File
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="p-6">
            <h2 className="font-semibold text-lg mb-4">Comments (154)</h2>
            <div className="space-y-6">
              {/* Comment List */}
              {["Donald Stewart", "Kristin Watson", "Cody Fisher"].map(
                (name, index) => (
                  <div className="flex gap-3" key={index}>
                    <Avatar>
                      <AvatarImage
                        src={`/placeholder.svg?height=40&width=40`}
                      />
                      <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{name}</span>
                        <span className="text-xs text-gray-500">• 1 week ago</span>
                      </div>
                      <p className="text-gray-700 mb-2">
                        Example comment for {name}.
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 h-8"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" /> REPLY
                      </Button>
                    </div>
                  </div>
                )
              )}
              {/* Load More Button */}
              <Button
                variant="outline"
                className="w-full border-dashed text-gray-500"
              >
                Load More
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right side - Course Contents */}
      <div className="w-full lg:w-80 border-l bg-gray-50 overflow-auto max-h-screen hide-scrollbar">
        <div className="p-4 border-b bg-white">
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Course Contents</h2>
            <span className="text-xs text-green-500 font-medium">
              15% Completed
            </span>
          </div>
          <Progress
            value={15}
            className="h-1 mt-2 bg-gray-200"
            indicatorClassName="bg-green-500"
          />
        </div>

        <div className="max-h-[calc(100vh-64px)]">
          {sectionsData.map((section, index) => (
            <div key={index} className="border-b">
              <button
                className="flex items-center justify-between w-full p-4 text-left"
                onClick={() => toggleSection(section.name)}
              >
                {expandedSections[section.name] ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                <span className="flex-1 ml-2 font-medium text-sm">
                  {section.name}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <CheckCircle className="w-3 h-3 text-gray-400 mr-1" />{" "}
                  {section.lectures} lectures
                </span>
              </button>
              {expandedSections[section.name] && (
                <div className="pl-10 pr-4 pb-2">
                  <div className="py-2 flex items-center text-sm">
                    <input type="checkbox" className="bg-green-100" />
                    <span className="ml-2 text-gray-700">First Lecture</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
