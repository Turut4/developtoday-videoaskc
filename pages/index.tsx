import { FilterList } from "@/components/FilterList";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="h-screen">
      <Header />
      <FilterList />
    </div>
  );
}
