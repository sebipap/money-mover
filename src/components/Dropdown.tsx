import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
};

export const Dropdown = ({ value, onChange, options, label }: Props) => (
  <div className="flex-1">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="select select-bordered w-full max-w-xs input"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
