import React, { useEffect, useState } from "react";
import { AnnouncementCard } from "@/CustomComponent/Card";
import oopsImage from "@/assets/oopsimage.png";
import { axiosInstance } from "@/lib/AxiosInstance";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/announcement/getAll");
        setAnnouncements(response.data.announcements || []);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <section className="p-3 md:p-0">
      <div className="flex flex-col pb-5 gap-5 mb-10">
        <p className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg">
          Announcements
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-lg text-muted-foreground">Loading announcements...</p>
        </div>
      ) : announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-semibold text-muted-foreground">
            No announcements available
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            When announcements are posted, they will appear here.
          </p>
          <img
            src={oopsImage}
            alt="No announcements"
            className="w-full max-w-md h-80 object-contain mt-6"
          />
        </div>
      ) : (
        <div className="overflow-hidden">
          <AnnouncementCard mainHeading={"Latest Announcements"} data={announcements} />
        </div>
      )}
    </section>
  );
};

export default Announcement;
