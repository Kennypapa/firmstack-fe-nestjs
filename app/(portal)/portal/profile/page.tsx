"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const profile = {
  fullName: "Alex Johnson",
  email: "alex.johnson@company.com",
  department: "Engineering",
  role: "Software Developer",
};

export default function PortalProfilePage() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/portal"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <h1 className="text-2xl font-bold text-navy mb-8">My Profile</h1>

      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm space-y-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Full Name</p>
          <p className="mt-1 text-navy font-medium">{profile.fullName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p className="mt-1 text-navy font-medium">{profile.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Department</p>
          <p className="mt-1 text-navy font-medium">{profile.department}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Role</p>
          <p className="mt-1 text-navy font-medium">{profile.role}</p>
        </div>
      </div>
    </div>
  );
}
