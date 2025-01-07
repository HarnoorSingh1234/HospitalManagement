import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/PDCard";
import { Button } from "./ui/PDButton";
import { Input } from "./ui/PDInput";
import { Label } from "./ui/PDLabel";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle, Circle, Trash2, X } from "lucide-react";

const mockGoals = [
  { id: 1, name: "Run 20 miles", completed: false },
  { id: 2, name: "Do 100 push-ups", completed: true },
];

export function FitnessGoalsSection() {
  const [goals, setGoals] = useState(mockGoals);
  const [dialogOpen, setDialogOpen] = useState(false); // Manage dialog open/close state

  const handleAddGoal = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newGoal = {
      id: goals.length + 1,
      name: formData.get("goalName"),
      completed: false,
    };
    setGoals([...goals, newGoal]);
    setDialogOpen(false); // Close the dialog after adding
    event.currentTarget.reset();
  };

  const toggleGoalCompletion = (id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const incompleteGoals = goals.filter((goal) => !goal.completed);
  const completedGoals = goals.filter((goal) => goal.completed);

  return (
    <Card className="shadow-lg bg-white rounded-lg border border-green-200 overflow-hidden">
      {/* Header */}
      <CardHeader className="px-4 py-3 border-b border-green-200 bg-green-50">
        <CardTitle className="flex justify-between items-center">
          <span className="text-green-700 text-lg font-semibold">
            Fitness Goals
          </span>

          {/* Add Goal Dialog */}
          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
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
                  Add New Fitness Goal
                </Dialog.Title>
                <form
                  onSubmit={handleAddGoal}
                  className="space-y-4 px-6 pb-6 overflow-y-auto max-h-[80vh]"
                >
                  <div>
                    <Label htmlFor="goalName" className="text-green-700">
                      Goal Name
                    </Label>
                    <Input
                      id="goalName"
                      name="goalName"
                      required
                      className="border-green-300 focus:ring-green-600 focus:border-green-600"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-white bg-green-600 hover:bg-green-700"
                  >
                    Add Goal
                  </Button>
                </form>
                <div className="absolute top-3 right-3">
                  <Dialog.Close asChild>
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </CardTitle>
      </CardHeader>

      {/* Incomplete Goals */}
      <CardContent className="p-4 space-y-4 max-h-80 overflow-y-auto scrollbar-hide">
        <h3 className="text-green-700 font-semibold text-lg">Incomplete Goals</h3>
        {incompleteGoals.map((goal) => (
          <div
            key={goal.id}
            className="border border-green-100 rounded-md shadow-sm p-4 bg-white hover:bg-green-50 transition-colors flex justify-between items-center"
          >
            {/* Goal Details */}
            <div className="flex items-center space-x-2">
              <Circle
                className="text-green-600 h-5 w-5 cursor-pointer hover:text-green-700"
                onClick={() => toggleGoalCompletion(goal.id)}
                aria-label="Mark as Completed"
              />
              <p className="text-gray-800 font-medium">{goal.name}</p>
            </div>

            {/* Delete Icon */}
            <Trash2
              className="text-red-600 h-5 w-5 cursor-pointer hover:text-red-700"
              onClick={() => deleteGoal(goal.id)}
              aria-label="Delete Goal"
            />
          </div>
        ))}
      </CardContent>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <CardContent className="p-4 space-y-4 max-h-80 overflow-y-auto scrollbar-hide bg-green-50">
          <h3 className="text-green-700 font-semibold text-lg">
            Completed Goals
          </h3>
          {completedGoals.map((goal) => (
            <div
              key={goal.id}
              className="border border-green-100 rounded-md shadow-sm p-4 bg-white hover:bg-green-50 transition-colors flex justify-between items-center"
            >
              {/* Goal Details */}
              <div className="flex items-center space-x-2">
                <CheckCircle
                  className="text-green-600 h-5 w-5 cursor-pointer hover:text-green-700"
                  onClick={() => toggleGoalCompletion(goal.id)}
                  aria-label="Mark as Incomplete"
                />
                <p className="text-gray-500 line-through">{goal.name}</p>
              </div>

              {/* Delete Icon */}
              <Trash2
                className="text-red-600 h-5 w-5 cursor-pointer hover:text-red-700"
                onClick={() => deleteGoal(goal.id)}
                aria-label="Delete Goal"
              />
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
