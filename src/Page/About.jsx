import React from "react";
import { Button } from "@/components/ui/button"

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Our History Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="md:w-1/3">
            <img
              src="https://lirp.cdn-website.com/6602115c/dms3rep/multi/opt/shutterstock_2439625087-696w.jpg"
              alt="Smiling person"
              className="w-full h-auto rounded-md"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our History
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Aceswell Scholars was originally formed in 2006 as a non-profit
                in home and online tutoring company. Aceswell Scholars was
                formed with an unwavering yearning to improve the academic
                performance of students in the metro area. The organization
                developed and implemented a curriculum that provides
                remediation, enrichment, and mastery. With a growing awareness
                that many academic deficiencies stem from problematic areas
                beyond the classroom, in 2012 Aceswell Scholars began to take a
                more holistic approach to education and the overall personal
                growth of each student. To do this, the program kids doing dream
                was developed which tied together classroom performance with
                personal diet.
              </p>
              <p>
                Reorganized in 2015 as a for-profit educational and mentoring
                organization, Aceswell Scholars has adopted a more comprehensive
                method to reach more students in the most effective and
                permanent way. Our assistance goes beyond the classroom now. We
                make our students aware of the importance of education, health,
                and personal growth. We know that every child wants to succeed
                in life. It is our goal to give them the space to see that they
                can, and the tenacity to determine their own definition of
                success. Collectively we are determined to build relationships
                and positively affect the lives of all the students and families
                that we touch.
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="grid md:grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 mb-6">
                Aceswell Scholars, Inc. is an organization holistically designed
                to prepare and meet the needs of each child. We promote the
                enrichment of the mind, body, and spirit. It is our position
                that academics and social sciences are intricately connected to
                the development of the whole child. We strive to expose students
                to different facets of our society, as well as the cultures
                within it. It is with this belief that we look to broaden the
                vision of each child and obtain improvements in their academic
                and social life.
              </p>
            </div>
            <Button className="bg-green-500 hover:bg-green-600 text-white w-fit">
              Contact Us
            </Button>
          </div>
          <div>
            <img
              src="https://lirp.cdn-website.com/6602115c/dms3rep/multi/opt/about+us+1-696w.jpg"
              alt="Group of people with arms around each other"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
