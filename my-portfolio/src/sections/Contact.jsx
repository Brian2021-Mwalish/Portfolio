// src/sections/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState('Send Message');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const form = e.target;
    const data = new FormData(form);

    const response = await fetch('https://formspree.io/f/xwpqqdqy', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      setStatus('Sent!');
      form.reset();
    } else {
      setStatus('Try Again');
    }

    setTimeout(() => setStatus('Send Message'), 3000);
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
        <p className="text-lg text-gray-200 mb-10">
          I'm always open to discussing new opportunities, side projects, or collaborations.
          Feel free to reach out—let's build something awesome together!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-400 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-400 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 border border-gray-400 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full md:w-auto bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-100 transition duration-300"
          >
            {status}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
