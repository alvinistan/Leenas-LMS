import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { AppContext } from "../../context/AppContext";

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="py-16 md:px-40 px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
        Learn from the best
      </h2>
      <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl mx-auto">
        Discover our top-rated courses across various categories. From coding
        and design to
        <br /> business and wellness, our courses are crafted to deliver
        results.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-0 my-10 md:my-16">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="inline-block mt-6 text-gray-600 border border-gray-500/30 px-10 py-3 rounded hover:bg-gray-100 transition-colors duration-200"
      >
        {/* <CourseCard/> */}
        Show all Courses
      </Link>
    </div>
  );
};

export default CourseSection;
