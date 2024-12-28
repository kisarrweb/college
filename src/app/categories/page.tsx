import {prisma} from "@/lib/db";
import Link from "next/link";


export default async function CategoryPage() {
  const categories = await prisma.category.findMany();

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">All Types</h1>
      <ul className="border-t border-b border-black-10 py-5">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between mx-5"
          >
            <Link href={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
