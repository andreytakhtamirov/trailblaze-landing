import MapApp from "@/components/MapApp";

export default function AppPage() {
  return (
    <>
      <section className="pb-16 pt-36 xs:pt-24">
        <div className="mx-4 flex flex-wrap border-2 rounded-xl bg-white">
          <h1 className="text-4xl font-bold text-gray-800 px-4 pt-4">Interactive Demo</h1>
          <div className="w-full px-4 py-4">
            <MapApp />
          </div>
        </div>
      </section >
    </>
  );
}
