import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { Calendar } from "@/components/atoms/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { useDatePicker } from "../../hooks/use-date-picker";

export function DatePicker({
  onDateChange,
}: {
  onDateChange: (date: number | undefined) => void;
}) {
  const {
    date,
    setDate,
    month,
    year,
    handleYearChange,
    handleMonthChange,
    getAge,
  } = useDatePicker();

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  React.useEffect(() => {
    onDateChange(getAge());
  }, [date, onDateChange, getAge]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-3">
          <Select onValueChange={(value) => handleYearChange(parseInt(value))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder={year} />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => handleMonthChange(months.indexOf(value))}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder={months[month]} />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={new Date(year, month)}
          onMonthChange={(newMonth) => {
            handleMonthChange(newMonth.getMonth());
            handleYearChange(newMonth.getFullYear());
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
