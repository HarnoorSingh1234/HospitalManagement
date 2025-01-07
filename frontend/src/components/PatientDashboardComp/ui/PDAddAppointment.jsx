/* eslint-disable react/prop-types */
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "./PDLabel";
import { Input } from "./PDInput";
import { Button } from "./PDButton";

export function AddAppointmentDialog({ handleAddAppointment }) {
  const [open, setOpen] = useState(false); // State to manage dialog open/close

  const onSubmit = (event) => {
    handleAddAppointment(event); // Call the provided handler
    setOpen(false); // Close the dialog
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
      <Button
  className="bg-green-500 text-white hover:bg-green-700 w-[25px] h-[35px] rounded-[990px] flex items-center justify-center p-0"
>
  +
</Button>


      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 opacity-0 data-[state=open]:opacity-100" />
        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-md shadow-lg focus:outline-none transition-transform duration-300 scale-95 opacity-0 data-[state=open]:opacity-100 data-[state=open]:scale-100"
        >
          <Dialog.Title className="text-lg font-bold text-green-700 mb-4 px-6 pt-6">
            Add New Appointment
          </Dialog.Title>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit(event); // Handle form submission and close the dialog
            }}
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
                required
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-green-600 focus:border-green-600"
              >
                <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
                <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
              </select>
            </div>
            <div>
              <Label htmlFor="mode" className="text-green-700">
                Mode
              </Label>
              <select
                id="mode"
                name="mode"
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
              Save Appointment
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
