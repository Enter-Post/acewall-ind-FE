import { useState, useEffect } from "react";
import { format, isAfter, isToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext, Controller } from "react-hook-form";

export default function DueDatePicker({ name = "dueDate", minDate, maxDate }) {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  
  const [open, setOpen] = useState(false);
  const selectedDate = watch(`${name}.date`);
  const selectedTime = watch(`${name}.time`);

  const formattedDate = selectedDate 
    ? format(new Date(selectedDate), "PPP") 
    : "Pick a date";

  const getMinTime = () => {
    if (selectedDate && isToday(new Date(selectedDate))) {
      const now = new Date();
      return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    }
    return undefined;
  };

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const fullDateTime = new Date(selectedDate);
      fullDateTime.setHours(hours, minutes, 0, 0);

      if (isAfter(fullDateTime, new Date())) {
        setValue(`${name}.dateTime`, fullDateTime.toISOString());
      } else {
        setValue(`${name}.dateTime`, null);
      }
    }
  }, [selectedDate, selectedTime, setValue, name]);

  return (
    <div className="space-y-4 p-4 rounded-xl shadow-md border">
      <Label htmlFor={`${name}-date`}>Select Date</Label>
      <Controller
        name={`${name}.date`}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id={`${name}-date`}
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal", 
                  !field.value && "text-muted-foreground"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                {formattedDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  if (!date) return;
                  const selected = new Date(date);
                  if (
                    (!minDate || selected >= minDate) &&
                    (!maxDate || selected <= maxDate) &&
                    (isAfter(selected, new Date()) || isToday(selected))
                  ) {
                    field.onChange(selected.toISOString());
                    setOpen(false);
                  }
                }}
                disabled={(date) => {
                  const d = new Date(date);
                  return (
                    d < new Date().setHours(0, 0, 0, 0) ||
                    (minDate && d < new Date(minDate).setHours(0, 0, 0, 0)) ||
                    (maxDate && d > new Date(maxDate).setHours(23, 59, 59, 999))
                  );
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {errors?.[name]?.date && (
        <p className="text-sm text-red-500">{errors[name].date.message}</p>
      )}

      <div className="space-y-2">
        <Label htmlFor={`${name}-time`}>Select Time</Label>
        <Controller
          name={`${name}.time`}
          control={control}
          render={({ field }) => (
            <Input
              id={`${name}-time`}
              type="time"
              value={field.value || ""}
              onChange={field.onChange}
              min={getMinTime()}
              className="w-full"
            />
          )}
        />
        {errors?.[name]?.time && (
          <p className="text-sm text-red-500">{errors[name].time.message}</p>
        )}
      </div>

      {errors?.[name]?.dateTime && (
        <p className="text-sm text-red-500">{errors[name].dateTime.message}</p>
      )}

      {selectedDate && selectedTime && (
        <div className="text-center text-green-600 font-medium">
          Selected:{" "}
          {format(
            new Date(
              new Date(selectedDate).setHours(
                ...selectedTime.split(":").map(Number),
                0,
                0
              )
            ),
            "PPpp"
          )}
        </div>
      )}
    </div>
  );
}
