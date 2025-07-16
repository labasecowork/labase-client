import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useEffect } from "react";

export default function ScanQRReservationsPage() {
  const { changeTitle } = useTitle();
  useEffect(() => {
    changeTitle("Escanear código QR - La base");
  }, []);
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="absolute top-0 left-0 z-10 w-full">
        <div className=" mb-6 max-w-4xl mx-auto w-full mt-8 px-4">
          <CustomHeader
            title="Escanear código QR"
            to={ROUTES.Admin.ViewAllReservations}
            classNameTitle="text-white"
            classNameLink="bg-stone-50/10 text-white hover:bg-stone-50/20"
          />
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
