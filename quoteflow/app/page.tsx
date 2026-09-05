import Hero from "@/components/Hero";
import Calculator from "@/components/Calculator";

const Page = () => {
  return (
    <>
      <section>
        <h1 className="text-center">Get an Instant Estimate</h1>
        <p className="text-center mt-5">
          Select the services you need below, and we'll calculate your price
          instantly.
        </p>
      </section>
      <main>
        <div className="flex flex-row w-full gap-4">
          <div className="w-2/3 bg-red-500 p-5 ">
            Left Side (services)
            <Hero />
          </div>
          {/* <div className="w-1/3 ">
            <Calculator />
          </div> */}
        </div>
      </main>
    </>
  );
};

export default Page;
