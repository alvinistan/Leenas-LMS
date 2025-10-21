import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
    <section className="pb-16 px-6 md:px-0 max-w-6xl mx-auto">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Testimonials</h2>
        <p className="text-gray-500 mt-3 md:text-base">
          Hear from our learners as they share their journeys of transformation, success, <br className="hidden md:block" />
          and how our platform has made a difference in their lives.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-8 mt-14 md:grid-cols-2 lg:grid-cols-3">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col justify-between text-sm text-left border border-gray-200 rounded-xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-4 bg-gray-100/60 border-b border-gray-200">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>

            {/* Feedback */}
            <div className="p-6 pb-8 flex flex-col justify-between flex-grow">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="h-5"
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-5 leading-relaxed">{testimonial.feedback}</p>
            </div>

            {/* Read More */}
            <div className="px-6 pb-5">
              <a
                href="#"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection
