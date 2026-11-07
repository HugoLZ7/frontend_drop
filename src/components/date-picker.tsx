"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { Matcher } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  id: string;
  name: string;
  placeholder?: string;
  disabled?: Matcher | Matcher[];
  startMonth?: Date;
  endMonth?: Date;
};

export function DatePicker({
  id,
  name,
  placeholder = "Seleccionar",
  disabled,
  startMonth,
  endMonth,
}: DatePickerProps) {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              type="button"
              variant="outline"
              className="w-full justify-between font-normal"
            />
          }
        >
          {date ? (
            format(date, "dd/MM/yyyy")
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <CalendarIcon className="size-4 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selected) => {
              setDate(selected);
              setOpen(false);
            }}
            captionLayout="dropdown"
            locale={es}
            disabled={disabled}
            startMonth={startMonth}
            endMonth={endMonth}
            defaultMonth={date ?? endMonth}
          />
        </PopoverContent>
      </Popover>
      <input
        type="hidden"
        name={name}
        value={date ? format(date, "yyyy-MM-dd") : ""}
      />
    </>
  );
}
