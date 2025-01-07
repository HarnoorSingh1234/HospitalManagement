import { AppointmentsSection } from "../components/PatientDashboardComp/AppointmentsSection";
import { ReportsSection } from "../components/PatientDashboardComp/ReportsSection";
import { FitnessGoalsSection } from "../components/PatientDashboardComp/FitnessGoalsSection";

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20"> {/* Adjusted top padding */}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Section */}
        <AppointmentsSection />

        {/* Reports Section */}
        <ReportsSection />

        {/* Fitness Goals Section */}
        <FitnessGoalsSection />
      </div>
    </div>
  );
}
