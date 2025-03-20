import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus } from "lucide-react";

function AssessmentQuestions() {
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([
    "this is my tests",
    "Left aligned text on all viewport sizes.",
    "what is the scope of y = 2x + 3?",
    "2x +2 = 3?",
    "Laravel is an command base?",
    "My name _____ Rahul?",
    "Upload a file?",
    "Select all the former Prime Minister of India?",
  ]);

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
    }
  };

  return (
    <div className="py-4">
      <h2 className="text-xl font-medium text-gray-700 mb-4">
        Assessment Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" rounded-sm">
          <Textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter a new question..."
            className="h-40 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="flex justify-end p-2 border-t">
            <Button
              onClick={handleAddQuestion}
              disabled={!newQuestion.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Add Question
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {questions.map((question, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-3 text-white rounded-sm ${
                index % 2 === 0 ? "bg-blue-500" : "bg-green-500"
              }`}
            >
              <span>{question}</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-white hover:bg-transparent"
              >
                <Minus onClick={()=>{}} className="h-5 w-5" />
                <span className="sr-only">Add</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AssessmentQuestions
