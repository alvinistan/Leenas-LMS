import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Youtube from "react-youtube";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

const CoursePreviewPage = () => {
  const { id, videoId } = useParams();
  const navigate = useNavigate();
  const { allCourses, calculateChapterTime } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const found = allCourses.find((c) => c._id === id);
    setCourseData(found || null);
    setOpenSections({});
  }, [id, allCourses]);

  if (!courseData) return <Loading />;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
      >
        <img src={assets.down_arrow_icon} alt="" className="h-4 w-4 rotate-90" />
        Back
      </button>

      <h1 className="text-lg font-semibold text-gray-900">{courseData.courseTitle}</h1>

      {/* Video on top */}
      <div className="mt-4">
        <Youtube
          videoId={videoId}
          opts={{ playerVars: { autoplay: 1 } }}
          iframeClassName="w-full aspect-video rounded-lg"
        />
      </div>

      {/* Course Structure below */}
      <div className="mt-8">
        <h2 className="text-base font-semibold text-gray-900">Course Structure</h2>
        <div className="pt-4">
          {courseData.courseContent?.map((chapter, index) => {
            const isOpen = !!openSections[index];
            return (
              <div key={index} className="mb-3 rounded-lg border border-gray-200 bg-white">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 cursor-pointer select-none"
                  onClick={() => setOpenSections((p) => ({ ...p, [index]: !p[index] }))}
                >
                  <div className="flex items-center gap-2 text-left">
                    <img
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      src={assets.down_arrow_icon}
                      alt=""
                    />
                    <p className="font-semibold text-sm">{chapter.chapterTitle}</p>
                  </div>
                  <p className="text-xs text-gray-600">
                    {chapter.chapterContent?.length || 0} lectures - {calculateChapterTime(chapter)}
                  </p>
                </button>

                <div
                  className={`overflow-hidden border-t border-gray-200 transition-[max-height] duration-300 ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <ul className="list-disc pl-5 pr-4 py-2 text-gray-700">
                    {chapter.chapterContent?.map((lecture, i) => (
                      <li key={i} className="flex items-start gap-2 py-1">
                        <img className="mt-1 h-4 w-4" src={assets.play_icon} alt="" />
                        <div className="flex w-full items-center justify-between text-xs">
                          <p className="pr-3">{lecture.lectureTitle}</p>
                          <p className="text-gray-600">
                            {humanizeDuration((lecture.lectureDuration || 0) * 60 * 1000, {
                              units: ["h", "m"],
                            })}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewPage;
