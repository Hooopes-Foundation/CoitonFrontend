import MaxWrapper from "@/components/shared/max-wrapper";
import NotFound from "@/components/shared/not-found";

export default function BlogPage() {
  return (
    <section className="w-full py-16 sm:py-24 md:py-36 overflow-x-clip flex-1">
      <MaxWrapper className="flex justify-center">
        {/* <h2 className="text-primary">Blog Page</h2> */}
        <NotFound />
      </MaxWrapper>
    </section>
  );
}
