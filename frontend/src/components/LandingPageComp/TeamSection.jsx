'use client';

import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: "Harnoor Singh Arora",
    role: "Frontend Developer",
    image: "/placeholder.svg?height=200&width=200",
    description: "Designed and developed the frontend. Currently in 2nd year, B.Tech CSE at GNDU."
  },
  {
    name: "Tushar Dhingra",
    role: "Frontend Designer",
    image: "/placeholder.svg?height=200&width=200",
    description: "Focused on frontend design. Currently in 2nd year, B.Tech CSE at GNDU."
  },
  {
    name: "PrabhPuran Singh",
    role: "Backend Developer and Data Manager",
    image: "/placeholder.svg?height=200&width=200",
    description: "Handled backend development and data management. Currently in 1st year, B.Tech CSE at GNDU."
  },
  {
    name: "Sanchita Mahajan",
    role: "UI Designer and Integration Specialist",
    image: "/placeholder.svg?height=200&width=200",
    description: "Worked on UI design and helped integrate the frontend and backend. Currently in 1st year, B.Tech CSE at GNDU."
  }
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-green-800 mb-12"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-green-50 text-green-800 h-full shadow-md rounded-lg p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                <p className="text-green-700 font-semibold text-center mt-2">{member.role}</p>
                <p className="text-green-600 text-center mt-2">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
