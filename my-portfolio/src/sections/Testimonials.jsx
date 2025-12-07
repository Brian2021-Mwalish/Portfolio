import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Testimonials = ({ onSectionChange }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const testimonials = [
   {
  name: 'Joseph Juma',
  role: 'Production Director',
  company: 'Kariki Farm Molo',
  content: 'Brian delivered outstanding graphic design work for our marketing materials. His creativity, attention to detail, and ability to bring our vision to life were exceptional. The designs were delivered on time and exceeded our expectations.',
  avatar: 'WK',
  rating: 5,
  color: 'bg-blue-500'
},

    {
      name: 'Joe Karanja',
      role: 'CTO',
      company: 'Lish AI Labs',
      content: 'Working with Brian was a pleasure. His full-stack expertise and innovative approach helped us launch our AI-powered application successfully. Highly recommended for any tech project.',
      avatar: 'KR',
      rating: 5,
      color: 'bg-emerald-500'
    },
    {
      name: 'Achieng Oduya',
      role: 'Startup Founder',
      company: 'GreenTech Ventures',
      content: 'Brian transformed our vision into reality. His code is clean, efficient, and scalable. He was proactive in suggesting improvements and always delivered high-quality work.',
      avatar: 'AO',
      rating: 5,
      color: 'bg-purple-500'
    },
    {
      name: 'Kiprop Kiprop',
      role: 'Senior Teacher',
      company: 'Njenga Karume sec School',
      content: 'As a fellow developer, I can attest to Brian\'s technical skills and collaborative nature. He writes maintainable code and is great at explaining complex concepts.',
      avatar: 'KK',
      rating: 5,
      color: 'bg-orange-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative min-h-screen bg-primary-bg py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl top-1/4 right-1/4" />
        <div className="absolute w-80 h-80 bg-pink-500/5 rounded-full blur-3xl bottom-1/4 left-1/4" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-yellow-400">
              What People Say
            </span>
          </h2>
          <p className="text-xl text-primary-secondary max-w-3xl mx-auto leading-relaxed">
            Don't just take my word for it. Here's what clients and colleagues have to say about working with me.
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-8" />
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-105 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-primary-secondary leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold mr-4 group-hover:scale-110 transition-transform duration-200`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-primary-text">{testimonial.name}</h4>
                  <p className="text-sm text-primary-secondary">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <div className="bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary-text mb-4">
              Ready to Join the List?
            </h3>
            <p className="text-primary-secondary mb-6 leading-relaxed">
              Let's work together and create something amazing. I'd love to add your testimonial to this collection.
            </p>
            <button
              onClick={() => onSectionChange('contact')}
              className="inline-flex items-center gap-2 bg-yellow-500 text-primary-text font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              Start a Project
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
