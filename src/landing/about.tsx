import React from "react";

export const AboutMe: React.FC = () => {
  return (
    <section className="py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center"></div>
          <p className="text-lg mb-6">Hi, I'm Michael Magán, a builder.</p>
          <img
            src="/buildspace.jpeg"
            alt="Buildspace Image"
            className="w-full h-auto max-w-md mx-auto rounded-lg shadow-lg"
          />
          <p className="text-lg mb-6">
            One of the highlights of my year was spending 11 weeks at
            Buildspace's campus in San Francisco, participating in the final sf2
            program. This experience changed the trajectory of my life and
            surrounded me with builders.
          </p>
          <p className="text-lg mb-6">
            Currently, I'm channeling my passion and expertise into building
            usehydra.ai. This project represents the culmination of my
            experiences and my vision for the future of AI technology.
          </p>
          <div className="text-center">
            <a
              href="#projects"
              className="inline-block bg-neon-green text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-neon-green-600 transition-all duration-300 shadow-[0_0_10px_#39ff14]"
            >
              View My Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
