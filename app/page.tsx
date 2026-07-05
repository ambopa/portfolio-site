import Header from "@/app/components/Header";
import Archive from "@/app/components/Archive";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1440px] px-[10px]">
      <Header />
      <Archive />
      <Footer />
    </main>
  );
}
