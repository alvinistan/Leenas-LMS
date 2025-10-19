import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import Youtube from "react-youtube";

const getYoutubeId = (url = "") => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.split("/").filter(Boolean).pop() || "";
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts[0] === "embed" || parts[0] === "shorts") return parts[1] || "";
    return parts.pop() || "";
  } catch {
    return url.split("/").pop() || "";
  }
};

const isMdUp = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
    setPlayerData(null);
  };

  useEffect(() => {
    fetchCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handlePreview = (lectureUrl) => {
    const videoId = getYoutubeId(lectureUrl);
    if (!videoId) return;
    if (isMdUp()) {
      // md+ : play in right-side card
      setPlayerData({ videoId });
    } else {
      // mobile/sm: go to separate preview page
      navigate(`/courses/${id}/preview/${videoId}`);
    }
  };

  return courseData ? (
    <>
      <div className="px-4 md:px-8 lg:px-20 flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between pt-20 md:pt-24 text-left">
        <div className="absolute top-0 left-0 w-full h-56 md:h-72 -z-10 bg-gradient-to-b from-cyan-100/70 to-transparent"></div>

        {/* left column */}
        <div className="max-w-xl z-10 text-gray-600 w-full">
          <h1 className="md:text-2xl text-xl font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>

          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* review and ratings */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                  alt="star"
                  className="w-4 h-4"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-blue-600">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "Ratings" : "Rating"})
            </p>

            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "Students" : "Student"}
            </p>

            <p className="text-sm">
              Course by <span className="text-blue-600 underline">Leenas</span>
            </p>
          </div>

          {/* course structure */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`${openSections[index] ? "rotate-180" : ""}`}
                        src={assets.down_arrow_icon}
                        alt=""
                      />
                      <p className="font-semibold md:text-base text-sm">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img className="w-4 h-4 mt-1" src={assets.play_icon} alt="" />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-sm">
                            <p className="pr-3">{lecture.lectureTitle}</p>
                            <div className="flex gap-3">
                              {lecture.isPreviewFree && (
                                <button
                                  onClick={() => handlePreview(lecture.lectureUrl)}
                                  className="text-blue-600 hover:underline"
                                >
                                  Preview
                                </button>
                              )}
                              <p>
                                {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                  units: ["h", "m"],
                                })}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-12 text-sm md:text-base">
            <h3 className="text-xl font-semibold text-gray-800">Course description</h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            ></p>
          </div>
        </div>

        {/* right column */}
        <div className="border border-gray-300 p-2 z-10 w-full md:w-auto max-w-lg rounded-2xl overflow-hidden bg-white md:sticky md:top-24">
          {/* md+: show player if selected, else thumbnail. On mobile, always show thumbnail (video plays in separate page). */}
          <div className="w-full">
            {playerData && isMdUp() ? (
              <Youtube
                videoId={playerData.videoId}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video"
              />
            ) : (
              <img src={courseData.courseThumbnail} alt="" className="w-full aspect-video object-cover" />
            )}
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2">
              <img className="w-3.5" src={assets.time_left_clock_icon} alt="" />
              <p className="text-red-500">
                <span className="font-medium">5 days at this price</span> left
              </p>
            </div>

            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}{" "}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                {currency} {courseData.coursePrice}
              </p>
              <p className="text-lg text-gray-500">{courseData.discount}% off</p>
            </div>

            <div className="flex items-center text-sm md:text-base gap-4 pt-3 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="" />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="" />
                <p>{calculateNoOfLectures(courseData)} Lectures</p>
              </div>
            </div>

            <button className="cursor-pointer md:mt-6 mt-4 w-full py-3 bg-blue-600 text-white font-medium rounded-lg">
              {isAlreadyEnrolled ? "already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="md:text-xl text-lg font-bold text-gray-800">What's in the course?</p>
              <ul className="ml-4 pt-2 text-sm md:text-base list-disc text-gray-600">
                <li>lifetime access with free updates</li>
                <li>Step-by-step, hands-on project guidance</li>
                <li>Downloadable resources and secure code</li>
                <li>Quizzes to test your knowledge</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
