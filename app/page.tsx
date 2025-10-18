// app/page.tsx (or pages/index.tsx if you're using pages directory)
"use client";

import Link from "next/link";

const projects = [
  {
    name: "Simple CRUD App",
    href: "pages/CRUDtsx",
    description: "A basic CRUD app using Appwrite and Next.js",
  },
  {
    name: "E-Commerce Furniture Store",
    href: "pages/E-Commerce",
    description: "Mange products and view sales analytics using NextJS",
  },
  {
    name: "Blog Platform",
    href: "pages/Blog",
    description: "A blog system with post creation and user auth using NextJS",
  },
  {
    name: "Test Paymongo",
    href: "pages/Paymongo",
    description: "Basic paymongo payment webtest",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">My Projects</h1>
        <p className="text-gray-600">Select a project to explore:</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.name}
              href={project.href}
              className="block rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200 hover:border-blue-500"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                {project.name}
              </h2>
              <p className="text-gray-700 text-sm">{project.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
