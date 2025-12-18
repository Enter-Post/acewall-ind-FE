import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Loader,
} from "lucide-react";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditAssessmentDialog from "@/CustomComponent/CreateCourse/EditAssessment";

function QuestionDisplay({ question, index }) {
  return (
    <article className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4" aria-label={`Question ${index + 1}`}>
      {question.type === "file" ? (
        <section>
          <div className="font-medium text-gray-800 mb-3 flex gap-2 flex-col">
            <h5 className="text-xl font-bold">Instruction:</h5>
            <p className="text-lg">{question?.question}</p>
          </div>
          <div className="text-sm text-gray-700 bg-green-50 p-3 rounded border border-green-100">
            <h6 className="sr-only">Attached Files:</h6>
            <ul className="space-y-2">
              {question?.files.map((file, i) => (
                <li key={i}>
                  <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    href={file.url} 
                    className="flex items-center text-blue-700 hover:underline focus:ring-2 focus:ring-blue-500 rounded outline-none"
                    aria-label={`Download ${file.filename} (opens in new tab)`}
                  >
                    <FileText size={20} className="text-blue-500 mr-2" aria-hidden="true" />
                    <span>{file.filename}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <div className="flex gap-2 flex-col">
          <h5 className="text-xl font-bold">Question:</h5>
          <div
            className="text-lg font-medium text-gray-800 mb-3"
            dangerouslySetInnerHTML={{
              __html: `${question.question}`,
            }}
          />
        </div>
      )}

      {question.type === "mcq" && (
        <ul className="list-none ml-0 text-sm text-gray-700 space-y-2" role="list">
          {question.options?.map((opt, i) => {
            const isCorrect = question.correctAnswer === opt.toString();
            return (
              <li
                key={i}
                className={`p-2 rounded border ${
                  isCorrect 
                    ? "font-semibold text-green-800 bg-green-100 border-green-200" 
                    : "bg-white border-gray-200"
                }`}
              >
                <span className="mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
                {isCorrect && (
                  <Badge className="ml-2 bg-green-600 text-white" aria-label="Correct Answer">
                    Correct Answer
                  </Badge>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {(question.type === "qa" || question.type === "truefalse") && (
        <div className="text-sm text-gray-800 bg-green-100 p-3 rounded border border-green-200 mt-2" role="status">
          <span className="font-bold text-green-900">Correct Answer:</span>{" "}
          <span className="capitalize">{question.type === "truefalse" ? (question.correctAnswer === "true" ? "True" : "False") : question.correctAnswer}</span>
        </div>
      )}
    </article>
  );
}

export function AssessmentPage() {
  const { assessmentid } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAssessment = async () => {
    try {
      const res = await axiosInstance.get(`assessment/${assessmentid}`);
      setAssessment(res.data.assessment);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessment();
  }, [assessmentid]);

  const questionsByType =
    assessment?.questions?.reduce((groups, question) => {
      const type = question.type;
      if (!groups[type]) groups[type] = [];
      groups[type].push(question);
      return groups;
    }, {}) || {};

  if (loading) {
    return (
      <main className="flex justify-center items-center py-20" aria-busy="true" aria-live="polite">
        <Loader className="animate-spin h-10 w-10 text-green-600" />
        <span className="sr-only">Loading assessment details...</span>
      </main>
    );
  }

  if (!assessment) return <main className="p-10 text-center">Assessment not found.</main>;

  return (
    <main className="max-w-5xl mx-auto p-6" id="main-content">
      <nav aria-label="Breadcrumb">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 focus:ring-2 focus:ring-green-500"
          aria-label="Go back to previous page"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back
        </Button>
      </nav>

      <header className="mb-6 border-b pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <section>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-900">{assessment?.title}</h1>
            <Badge variant="secondary" className="px-3 py-1 text-sm font-semibold">
              {assessment?.category?.name}
            </Badge>
          </div>
          <time className="text-sm text-gray-600 mt-2 block" dateTime={assessment?.dueDate.date}>
            <strong>Due Date:</strong> {new Date(assessment?.dueDate.date).toLocaleDateString(undefined, { dateStyle: 'full' })}
          </time>
        </section>
        
        <section aria-label="Assessment Actions">
          <EditAssessmentDialog
            assessment={assessment}
            fetchAssessment={fetchAssessment}
          />
        </section>
      </header>

      {assessment?.description && (
        <section className="bg-blue-50 p-5 rounded-lg mb-8 border-l-4 border-blue-500" aria-labelledby="description-heading">
          <h2 id="description-heading" className="font-bold text-blue-900 mb-2">Description</h2>
          <p className="text-blue-800 leading-relaxed">{assessment.description}</p>
        </section>
      )}

      <section aria-labelledby="questions-heading">
        <h2 id="questions-heading" className="text-xl font-bold text-gray-800 mb-4">Assessment Questions</h2>
        {assessment.questions.length === 0 ? (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded border">No questions have been added to this assessment yet.</p>
        ) : (
          <Accordion type="multiple" className="w-full space-y-3">
            {["mcq", "qa", "truefalse", "file"].map((type) => {
              const group = questionsByType[type];
              if (!group || group.length === 0) return null;

              const typeLabels = {
                mcq: "Multiple Choice",
                qa: "Short Answer",
                truefalse: "True/False",
                file: "File Upload/Instruction"
              };

              return (
                <AccordionItem 
                  key={type} 
                  value={type} 
                  className="border rounded-lg bg-white shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-4 hover:bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-green-500 outline-none">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-gray-700 text-white hover:bg-gray-800 uppercase text-[10px] tracking-wider px-2">
                        {typeLabels[type]}
                      </Badge>
                      <span className="text-sm font-semibold text-gray-700">
                        {group.length} {group.length === 1 ? 'Question' : 'Questions'}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2">
                    <div className="space-y-6">
                      {group.map((question, idx) => (
                        <QuestionDisplay
                          key={question._id || idx}
                          question={question}
                          index={idx}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </section>
    </main>
  );
}