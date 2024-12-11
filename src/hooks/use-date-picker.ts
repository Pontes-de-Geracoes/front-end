import { useState } from "react";

export function useDatePicker(initialDate: Date = new Date()) {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [month, setMonth] = useState(initialDate.getMonth());
  const [year, setYear] = useState(initialDate.getFullYear());

  const handleYearChange = (year: number) => {
    setYear(year);
    setDate(new Date(year, month, 1));
  };

  const handleMonthChange = (month: number) => {
    setMonth(month);
    setDate(new Date(year, month, 1));
  };

  const getAge = () => {
    if (!date) return;

    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return {
    date,
    setDate,
    month,
    year,
    handleYearChange,
    handleMonthChange,
    getAge,
  };
}
