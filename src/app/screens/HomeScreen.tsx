import Banner from "@/components/root/banner";
import Bento from "@/components/root/bento";
import Flows from "@/components/root/flows";
import Latest from "@/components/root/latest";
import Reviews from "@/components/root/reviews";
import Support from "@/components/root/support";

export default function HomeScreen() {
  return (
    <section className="w-full py-16 sm:py-24 md:py-36 overflow-x-clip">
      <Banner />
      <Support />
      <Flows />
      <Bento />
      <Latest />
      <Reviews />
    </section>
  );
}
