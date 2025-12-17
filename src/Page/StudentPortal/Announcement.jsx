import React, { useEffect, useState } from "react";
import { AnnouncementCard } from "@/CustomComponent/Card";
import oopsImage from "@/assets/oopsimage.png";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalProvider";
import { Loader } from "lucide-react";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      // Check for user ID before fetching
      if (!user?._id) {
        console.warn("User ID not available, skipping announcement fetch.");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Added specific logging for fetch attempt
        console.log(`Fetching announcements for user ID: ${user._id}`);
        
        const response = await axiosInstance.get(`/announcements/getbystudent/${user._id}`);
        setAnnouncements(response.data.announcements || []);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [user?._id]); // Dependency on user._id to ensure refetch if user context changes

  const transformedData = announcements.map((a) => {
    const created = new Date(a.createdAt);
    return {
      title: a.title,
      message: a.message,
      course: a.course?.courseTitle ?? 'Unknown Course',
      // Ensure date/time formatting is clear
      date: created.toLocaleDateString('en-US'),
      time: created.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  });

  return (
    // Use role="region" or a standard section, setting an accessible name is beneficial.
    <section className="p-3 md:p-0" aria-label="Course Announcements">
      <div className="flex flex-col pb-2 gap-5">
        {/* Changed p to h1 for the main page title for proper semantic hierarchy */}
        <h1 className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
          Announcements
        </h1>
      </div>

      {/* Loading State: Use role="status" and aria-live="polite" */}
      {loading ? (
        <div className="flex justify-center items-center py-10" role="status" aria-live="polite">
          <Loader className="animate-spin" aria-hidden="true" />
          <span className="sr-only">Loading announcements...</span>
        </div>
      ) : announcements.length === 0 ? (
        // Empty State: Use role="status" to announce the outcome
        <div 
          className="flex flex-col items-center justify-center text-center px-4" 
          role="status" 
          aria-live="polite"
        >
          {/* Main heading for the empty state content */}
          <p className="text-2xl font-semibold text-muted-foreground">
            No announcements available
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            When announcements are posted, they will appear here.
          </p>
          <img
            src={oopsImage}
            // Essential: Descriptive alt text for the image
            alt="Illustration of no results or an empty inbox."
            className="w-full max-w-md h-80 object-contain mt-6"
            // Assuming oopsImage is decorative/informational, not a clickable element.
          />
        </div>
      ) : (
        // Content Display: Announcements are loaded
        <div className="overflow-hidden">
          {/* Assuming AnnouncementCard handles rendering accessible list of cards/items */}
          <AnnouncementCard 
            mainHeading={"Latest Announcements"} 
            data={transformedData} 
            // Optional: aria-label if the card structure is complex
            aria-label="List of latest announcements"
          />
        </div>
      )}
    </section>
  );
};

export default Announcement;