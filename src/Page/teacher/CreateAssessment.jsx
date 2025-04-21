import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { TextEditor } from "@/CustomComponent/createAssessment/TextEditor";

const CreateAssessmentPage = () => {
  // const [editorContent, setEditorContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf"
    );

    setSelectedFiles((prevFiles) => {
      // Avoid duplicate files (optional)
      const fileNames = new Set(prevFiles.map((f) => f.name));
      const uniqueNewFiles = newFiles.filter((f) => !fileNames.has(f.name));
      return [...prevFiles, ...uniqueNewFiles];
    });
    // Reset file input so user can re-upload the same file if needed
    e.target.value = "";
  };

  return (
    <div className="mx-auto p-2 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create New Assessment</h2>
      <p className="text-gray-600 mb-6">
        Upload a new Assessment for students.
      </p>

      <div className="grid gap-4">
        <Label htmlFor="title">Assessment Title</Label>
        <Input id="title" placeholder="Enter Assessment title" />

        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter Assessment description and instructions"
        />
      </div>

      <div className="mx-auto my-10 bg-white rounded-md">
        {/* <TextEditor /> */}
        <Label htmlFor="pdfUpload">Upload PDF(s)</Label>
        <Input
          id="pdfUpload"
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className="bg-gray-50"
        />

        {selectedFiles.length > 0 && (
          <ul className="text-sm text-green-600 space-y-1 mt-2">
            {selectedFiles.map((file, index) => (
              <li key={index}>📄 {file.name}</li>
            ))}
          </ul>
        )}

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
