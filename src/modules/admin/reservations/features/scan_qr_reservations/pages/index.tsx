import { ROUTES } from "@/routes/routes";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ScanQRReservationsPage() {
  return (
    <div className="w-screen h-screen ">
      <div className="absolute top-0 left-0 z-10 w-full p-4">
        <div className="flex flex-col gap-4 mb-6 max-w-5xl mx-auto w-full">
          <Link
            to={ROUTES.Admin.ViewAllReservations}
            className="bg-stone-50/10 size-12 flex items-center justify-center rounded-full border-none shadow-none transition-all hover:bg-stone-100/40"
          >
            <ArrowLeftIcon className="size-4 text-white" />
          </Link>
          <h2 className="text-2xl font-bold text-white">Escanear código QR</h2>
        </div>
      </div>

      <div className=" h-full w-full relative">
        <Scanner
          components={{
            finder: false,
          }}
          styles={{
            container: {
              width: "100vw",
              height: "100vh",
              backgroundColor: "transparent",
            },
            video: {
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              backgroundColor: "transparent",
              transform: "scaleX(-1)",
            },
          }}
          onScan={(result) => console.log(result)}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="sm:hidden">
              <div
                className="absolute top-0 left-0 w-full bg-black/70"
                style={{ height: "calc(50vh - 125px)" }}
              ></div>

              <div
                className="absolute bottom-0 left-0 w-full bg-black/70"
                style={{ height: "calc(50vh - 125px)" }}
              ></div>

              <div
                className="absolute left-0 bg-black/70"
                style={{
                  top: "calc(50vh - 125px)",
                  height: "250px",
                  width: "calc(50vw - 125px)",
                }}
              ></div>

              <div
                className="absolute right-0 bg-black/70"
                style={{
                  top: "calc(50vh - 125px)",
                  height: "250px",
                  width: "calc(50vw - 125px)",
                }}
              ></div>
            </div>

            <div className="hidden sm:block">
              <div
                className="absolute top-0 left-0 w-full bg-black/70"
                style={{ height: "calc(50vh - 200px)" }}
              ></div>

              <div
                className="absolute bottom-0 left-0 w-full bg-black/70"
                style={{ height: "calc(50vh - 200px)" }}
              ></div>

              <div
                className="absolute left-0 bg-black/70"
                style={{
                  top: "calc(50vh - 200px)",
                  height: "400px",
                  width: "calc(50vw - 200px)",
                }}
              ></div>

              <div
                className="absolute right-0 bg-black/70"
                style={{
                  top: "calc(50vh - 200px)",
                  height: "400px",
                  width: "calc(50vw - 200px)",
                }}
              ></div>
            </div>
          </div>
        </Scanner>
      </div>
    </div>
  );
}
