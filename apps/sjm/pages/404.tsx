import Link from "next/link";

export default function Custom404() {
  return (
        <section className="flex flex-col justify-center text-center min-h-screen">
            <h1 className="text-3xl">Sorry, we can't find what you are looking for.</h1> 
            <h2 className="text-xl">Please try navigating to the <Link href='/'>home page</Link>.</h2>
        </section>
  )
}