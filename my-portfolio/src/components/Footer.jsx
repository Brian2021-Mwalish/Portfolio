import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Branding */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-white">Brian Mwalish</h1>
          <p className="text-sm mt-2 text-gray-400">Software Engineer • Crafting Code & Interfaces</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#projects" className="hover:text-white">Projects</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>

        {/* Socials */}
        <div className="flex justify-center md:justify-end space-x-5 text-xl">
          <a href="https://github.com/Brian2021-Mwalish" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin />
          </a>
                  </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Mwalish. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
