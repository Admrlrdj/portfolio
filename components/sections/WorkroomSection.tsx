import { Shards } from "@/components/fx/Shards";
import { Workroom } from "@/components/scene/Workroom";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/i18n/T";

export function WorkroomSection() {
  return (
    <section id="kamar" aria-labelledby="kamar-judul" className="page">
      <Shards seed={1} />
      <div className="wrap w-full">
        <h2 id="kamar-judul" className="h-section">
          <T id="Kamar Radja" en="Radja&apos;s Room" />
        </h2>
        <p className="mt-3 max-w-[40rem] text-muted">
          <T
            id="Selamat datang di ruang kerja saya. Monitor, kalender, rak buku, sampai ponsel di meja masing-masing menyimpan satu bagian cerita. Klik salah satunya untuk mulai menjelajah."
            en="Welcome to my workspace. The monitor, the calendar, the bookshelf, even the phone on the desk each hold a part of my story. Click one to start exploring."
          />
        </p>
        <Reveal className="mt-8">
          <Workroom />
        </Reveal>
      </div>
    </section>
  );
}
