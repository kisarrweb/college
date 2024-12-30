import Link from 'next/link';


export default function page() {
  return (

      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">

        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
          <h1 className="text-3xl font-bold">CEM Ahoune Sané</h1>
          
          <Link href="tel:+221775544191" className="hover:underline">
            (221) 33 994 18 04
          </Link>
          <a href="mailto:cemasane@gmail.com">cemasane@gmail.com</a>
        </div>

      </main>


  );
}

