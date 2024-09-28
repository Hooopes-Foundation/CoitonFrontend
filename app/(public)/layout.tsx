import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default function PublicLayout({ children }: TParentLayout) {
  return (
    <div className="flex flex-col">
      <div className="absolute -z-10 top-0 left-0 bg-gradient-to-b from-[#FFF4DE] via-[#FFF4DE]/50 to-background min-h-screen w-full" />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
