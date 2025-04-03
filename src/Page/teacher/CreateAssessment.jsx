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
import { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Image,
  Printer,
  Eye,
  FileVideo,
  Plus,
} from "lucide-react";
// import Canvas from "@/CustomComponent/Canvas";
import AssessmentQuestions from "@/CustomComponent/createAssessment/createQuestion";
import { TextEditor } from "@/CustomComponent/createAssessment/TextEditor";

const CreateAssessmentPage = () => {
  const [editorContent, setEditorContent] = useState("");
  const [AssessmentType, setAssessmentType] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, text: "this is my thesis", color: "blue" },
    { id: 2, text: "Left aligned text on all viewport sizes.", color: "green" },
    { id: 3, text: "what is the scope of y = 2x + 3?", color: "green" },
    { id: 4, text: "2x +2 = 3?", color: "blue" },
    { id: 5, text: "Laravel is an command base?", color: "blue" },
    { id: 6, text: "My name _____________ Rahul?", color: "blue" },
    { id: 7, text: "Upload a file?", color: "blue" },
    {
      id: 8,
      text: "Select all the former Prime Minister of India?",
      color: "blue",
    },
  ]);

  const fileInputRef = useRef(null);

  const handleEditorChange = (e) => {
    setEditorContent(e.target.innerHTML);
  };

  const handleFormatCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const insertImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.execCommand("insertImage", false, event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
    }
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="mx-auto p-2 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create New Assessment</h2>
      <p className="text-gray-600 mb-6">
        Upload a new Assessment for your students.
      </p>

      <div className="grid gap-4">
        <Label htmlFor="title">Assessment Title</Label>
        <Input id="title" placeholder="Enter Assessment title" />

        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter Assessment description and instructions"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" type="date" />
          </div>
          <div>
            <Label htmlFor="points">Points</Label>
            <Input id="points" type="number" placeholder="100" min="0" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="course">Course</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Math">Math</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="English">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="chapter">Chapter</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Chapter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Chapter 1">Chapter 1</SelectItem>
                <SelectItem value="Chapter 2">Chapter 2</SelectItem>
                <SelectItem value="Chapter 3">Chapter 3</SelectItem>
                <SelectItem value="Chapter 4">Chapter 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="assessmentType">Assessment Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="exam">Exam</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mx-auto p-4 my-10 bg-white shadow-md rounded-md">
        <TextEditor />

        {/* <AssessmentQuestions /> */}

        {/* Action Buttons */}
        <div className="mt-10 flex space-x-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssessmentPage;
