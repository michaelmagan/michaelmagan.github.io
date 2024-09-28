import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Link {
  name: string;
  url: string;
  icon: string;
}

const links: Link[] = [
  { name: "github", url: "https://github.com/michaelmagan", icon: "👨‍💻" },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/mnmagan/",
    icon: "💼",
  },
  { name: "twitter", url: "https://twitter.com/mrmagan_", icon: "🐦" },
  { name: "usehydra.ai", url: "https://usehydra.ai", icon: "🐙" },
];

const Links: React.FC = () => {
  return (
    <section className="py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          {links.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full max-w-md h-20 bg-opacity-20 backdrop-blur-md hover:bg-opacity-40 transition-all duration-300 border-2 border-white/30 hover:border-white/60 shadow-lg hover:shadow-xl"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-4 px-6"
                >
                  <motion.span
                    className="text-5xl mr-6"
                    whileHover={{ rotate: 20, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.icon}
                  </motion.span>
                  <span className="text-2xl font-bold tracking-wide">
                    {link.name}
                  </span>
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Links;