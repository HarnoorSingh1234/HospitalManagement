'use client';

import { motion } from 'framer-motion';
import { Calendar, FileText, User, UserCheck } from 'lucide-react';


const features = [
  {
    icon: <Calendar className="h-8 w-8 text-green-600" />,
    title: "Appointment System",
    description: "Seamlessly book and manage appointments, both online and offline, ensuring convenience for patients and doctors."
  },
  {
    icon: <FileText className="h-8 w-8 text-green-600" />,
    title: "Medical Report History",
    description: "Access and maintain a comprehensive history of medical reports for easy reference and continuity of care."
  },
  {
    icon: <User className="h-8 w-8 text-green-600" />,
    title: "Patient Dashboard",
    description: "Patients can view their medical history, upcoming appointments, and treatment plans in a user-friendly interface."
  },
  {
    icon: <UserCheck className="h-8 w-8 text-green-600" />,
    title: "Doctor Dashboard",
    description: "Doctors can manage patient records, schedule appointments, and track their workload efficiently."
  }
];


const FeaturesSection = () => {
  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-green-800 mb-12"
        >
          Key Features of MediSync
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white text-green-800 h-full shadow-md rounded-lg p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-green-700">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
