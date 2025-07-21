import { Button, CustomHeader } from "@/components/ui";
import { useCameraAccess, useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { CameraIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScanQRReservationsPage() {
  const { changeTitle } = useTitle();
  const [qrCode, setQrCode] = useState<IDetectedBarcode[]>([]);
  const { hasAccess, requestPermission } = useCameraAccess();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ROUTES.Admin.ViewAllReservations);
  };

  useEffect(() => {
    if (qrCode.length > 0) {
      console.log(qrCode);
    }
  }, [qrCode]);

  useEffect(() => {
    changeTitle("Escanear código QR - La base");
  }, []);

  if (!hasAccess) {
    return (
      <div className="px-4 py-8 flex h-full w-full">
        <div className="flex h-full w-full items-center justify-center bg-rose-500/10 mx-auto max-w-5xl p-8 sm:p-24">
          <div className="text-center mx-auto max-w-md">
            <h1 className="text-lg sm:text-2xl font-serif text-rose-800 font-bold">
              No tienes acceso a la cámara
            </h1>
            <p className="text-xs sm:text-sm text-rose-700 mt-0 sm:mt-2">
              Tienes que permitir el acceso a la cámara en tu navegador para
              poder escanear los códigos QR, o bien, intenta con otro navegador.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
              <Button
                onClick={handleBack}
                className=" text-rose-800 text-xs sm:text-sm shadow-none border border-rose-500/30 bg-transparent hover:bg-rose-500/20 w-full sm:w-auto"
              >
                Volver atrás
              </Button>
              <Button
                onClick={requestPermission}
                className="bg-rose-500/10 text-rose-800 text-xs sm:text-sm shadow-none hover:bg-rose-500/20 w-full sm:w-auto"
              >
                <CameraIcon className="w-4 h-4" />
                Permitir acceso
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          onScan={(result) => setQrCode(result)}
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
