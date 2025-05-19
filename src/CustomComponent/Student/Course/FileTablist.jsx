import { TabsContent } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import React from "react";

const FileTablist = ({ activeLesson, chapter }) => {
  console.log(chapter, "chapter");
  return (
    <TabsContent value="files" className="p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-6">
        {/* PDF Files */}
        {activeLesson &&
        activeLesson.pdfFiles &&
        activeLesson.pdfFiles.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              PDF Files
            </h3>
            {activeLesson.pdfFiles.map((pdf, index) => (
              <a
                key={index}
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <FileText className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-blue-600 text-sm">PDF {index + 1}</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            No PDF files available for this lesson
          </div>
        )}

        {/* Lesson Assessment */}
        {activeLesson &&
          activeLesson.lessonAssessment &&
          activeLesson.lessonAssessment.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Lesson Assessment Materials
              </h3>
              {activeLesson.lessonAssessment.map((Assessment, i) => (
                <div key={i} className="space-y-4">
                  <h4 className="font-medium text-sm text-gray-800">
                    {Assessment.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {Assessment.description}
                  </p>

                  {Assessment.pdfFiles && Assessment.pdfFiles.length > 0 && (
                    <div className="space-y-3 pl-4">
                      {Assessment.pdfFiles.map((pdf, pdfIndex) => (
                        <a
                          key={pdfIndex}
                          href={pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <FileText className="h-4 w-4 text-blue-500 mr-3" />
                          <span className="text-blue-600 text-sm">
                            Assessment PDF {pdfIndex + 1}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        {/* Chapter Assessment */}
        
      </div>
    </TabsContent>
  );
};

export default FileTablist;
