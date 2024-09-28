import Banner from "@/components/shared/banner";
import Bento from "@/components/shared/bento";
import Flows from "@/components/shared/flows";
import Latest from "@/components/shared/latest";
import Reviews from "@/components/shared/reviews";
import Support from "@/components/shared/support";

export default function Home() {
  return (
    <section className="w-full py-16 sm:py-24 md:py-36 overflow-x-clip flex-1">
      <Banner />
      <Support />
      <Flows />
      <Bento />
      <Latest />
      <Reviews />
    </section>
  );
}
