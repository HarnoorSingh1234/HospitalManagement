import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/PDCard";
import { AddAppointmentDialog } from "./ui/PDAddAppointment";
import { Edit3 } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "./ui/PDLabel";
import { Input } from "./ui/PDInput";
import { Button } from "./ui/PDButton";

const mockAppointments = [
  {
    id: 1,
    date: "2023-07-15",
    time: "10:00 AM - 10:30 AM",
    mode: "Online",
    doctor: "Dr. Smith",
    status: "Confirmed",
    location: "Virtual Consultation Room 1",
  },
  {
    id: 2,
    date: "2023-07-20",
    time: "2:30 PM - 3:00 PM",
    mode: "Offline",
    doctor: "Dr. Johnson",
    status: "Pending",
    location: "Main Clinic, Room 305",
  },
  {
    id: 3,
    date: "2023-07-25",
    time: "1:00 PM - 1:30 PM",
    mode: "Online",
    doctor: "Dr. Brown",
    status: "Pending",
    location: "Virtual Consultation Room 2",
  },
  {
    id: 4,
    date: "2023-07-30",
    time: "3:00 PM - 3:30 PM",
    mode: "Offline",
    doctor: "Dr. Green",
    status: "Confirmed",
    location: "Main Clinic, Room 306",
  },
];

export function AppointmentsSection() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const handleAddAppointment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const appointmentDate = new Date(formData.get("date"));

    // Prevent past dates
    if (appointmentDate < new Date().setHours(0, 0, 0, 0)) {
      alert("The date cannot be in the past.");
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      date: formData.get("date"),
      time: formData.get("time"),
      mode: formData.get("mode"),
      doctor: formData.get("doctor"),
      status: "Pending",
      location: "",
    };
    setAppointments([...appointments, newAppointment]);
    event.target.reset();
  };
  const handleEditAppointment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === editingAppointment.id
          ? {
              ...appointment,
              date: formData.get("date"),
              time: formData.get("time"),
              mode: formData.get("mode"),
              doctor: formData.get("doctor"),
              status: "Pending", // Always set the status to "Pending"
            }
          : appointment
      )
    );
  
    setEditingAppointment(null); // Close the edit dialog
  };
  

  return (
    <Card className="shadow-lg bg-white rounded-lg border border-green-200 overflow-hidden">
     <CardHeader className="px-4 py-3 border-b border-green-200 bg-green-50">
  <CardTitle className="flex justify-between items-center">
    <span className="text-green-700 text-lg font-semibold">Appointments</span>
    {/* Ensure AddAppointmentDialog renders a circular button */}
    <AddAppointmentDialog handleAddAppointment={handleAddAppointment} />
  </CardTitle>
</CardHeader>

      {/* Appointment Content */}
      <CardContent className="p-4 space-y-4 max-h-80 overflow-y-auto scrollbar-hide">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border border-green-100 rounded-md shadow-sm p-4 bg-white hover:bg-green-50 transition-colors flex items-center justify-between"
          >
            {/* Appointment Details */}
            <div>
              <p className="font-semibold text-green-700">
                ID: {appointment.id} - {appointment.date} at {appointment.time}
              </p>
              <p className="text-gray-700">
                {appointment.mode} with {appointment.doctor}
              </p>
              <p className="text-sm">
                <span
                  className={`font-semibold ${
                    appointment.status === "Confirmed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  Status: {appointment.status}
                </span>
              </p>
            </div>

            {/* Edit Button */}
            <Dialog.Root
              open={editingAppointment === appointment}
              onOpenChange={(isOpen) =>
                setEditingAppointment(isOpen ? appointment : null)
              }
            >
              <Dialog.Trigger asChild>
                <button
                  className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                  aria-label="Edit appointment"
                >
                  <Edit3 className="h-5 w-5" />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                <Dialog.Content
                  className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-md shadow-lg focus:outline-none"
                >
                  <Dialog.Title className="text-lg font-bold text-green-700 mb-4 px-6 pt-6">
                    Edit Appointment
                  </Dialog.Title>
                  <form
                    onSubmit={handleEditAppointment}
                    className="space-y-4 px-6 pb-6 overflow-y-auto max-h-[80vh]"
                  >
                    <div>
                      <Label htmlFor="date" className="text-green-700">
                        Date
                      </Label>
                      <Input
                        type="date"
                        id="date"
                        name="date"
                        defaultValue={editingAppointment?.date}
                        required
                        className="border-green-300 focus:ring-green-600 focus:border-green-600"
                        onFocus={(e) => e.target.showPicker()}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-green-700">
                        Time Slot
                      </Label>
                      <select
                        id="time"
                        name="time"
                        defaultValue={editingAppointment?.time}
                        required
                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-green-600 focus:border-green-600"
                      >
                        <option value="10:00 AM - 10:30 AM">
                          10:00 AM - 10:30 AM
                        </option>
                        <option value="10:30 AM - 11:00 AM">
                          10:30 AM - 11:00 AM
                        </option>
                        <option value="11:00 AM - 11:30 AM">
                          11:00 AM - 11:30 AM
                        </option>
                        <option value="11:30 AM - 12:00 PM">
                          11:30 AM - 12:00 PM
                        </option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="mode" className="text-green-700">
                        Mode
                      </Label>
                      <select
                        id="mode"
                        name="mode"
                        defaultValue={editingAppointment?.mode}
                        required
                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-green-600 focus:border-green-600"
                      >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="doctor" className="text-green-700">
                        Doctor
                      </Label>
                      <select
                        id="doctor"
                        name="doctor"
                        defaultValue={editingAppointment?.doctor}
                        required
                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-green-600 focus:border-green-600"
                      >
                        <option value="Dr. Smith">Dr. Smith</option>
                        <option value="Dr. Johnson">Dr. Johnson</option>
                      </select>
                    </div>
                    <Button
                      type="submit"
                      className="w-full text-white bg-green-600 hover:bg-green-700"
                    >
                      Save Changes
                    </Button>
                  </form>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
