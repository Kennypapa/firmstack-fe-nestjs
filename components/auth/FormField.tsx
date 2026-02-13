"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, icon, rightElement, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-navy mb-1.5">{label}</label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors ${
              icon ? "pl-10" : ""
            } ${rightElement ? "pr-24" : ""} ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
