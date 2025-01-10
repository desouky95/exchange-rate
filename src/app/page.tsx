import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="flex w-full h-full items-center justify-center">
        <ul className="border p-2  rounded-md shadow-lg flex flex-col gap-2">
          <li className="bg-white rounded-sm hover:bg-blue-200 px-10">
            <Link href={"/base"}>Base UI</Link>
          </li>
          <li className="bg-white rounded-sm hover:bg-zinc-500 hover:text-white px-10">
            <Link href={"/radix"}>Radix UI</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
