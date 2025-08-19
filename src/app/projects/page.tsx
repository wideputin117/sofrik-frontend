'use client'

import Link from "next/link";
import { ProjectListing } from "@/components/ProjectListing";
import GuardRoute from "@/components/GaurdRouteComponent";

const Page = () => {
  return (
    <div className="p-6">
      <GuardRoute />
       <div className="flex justify-end mb-4">
        <Link
          href="/projects/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add Project
        </Link>
      </div>

       <ProjectListing />
    </div>
  );
};

export default Page;
