// src/sections/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-blue-800 text-white py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-text-heading mb-6">Get In Touch</h2>
        <p className="text-lg text-text-default mb-8">
          I'm always open to discussing new opportunities, side projects, or collaborations. Feel free to reach out—let's build something awesome together!
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-button text-button-text px-6 py-3 rounded-lg hover:bg-button-hover transition duration-300 font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
