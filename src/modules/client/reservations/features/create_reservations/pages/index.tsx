import { Button, CustomHeader } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  SpaceSelector,
  DateSelector,
  PeopleCountInput,
  TimeRangeSelector,
  FullSpaceSwitch,
  ReservationSummary,
} from "../components";
import type { AvailabilityRequest, ReservationFormData } from "../types";
import { reservationSchema } from "../schemas";
import type { Space } from "@/modules/client/space/features/get_spaces/types";
import { convertTimeToISO } from "@/utilities";
import { ROUTES } from "@/routes/routes";
import { useGetAvailableSpaces } from "@/modules/client/space/features/get_spaces/service";
import { useCheckAvailability, useCreateReservation } from "../service";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
export default function CreateReservationPage() {
  const navigate = useNavigate();
  const { changeTitle } = useTitle();
  const { data: spacesData, isLoading: isLoadingSpaces } =
    useGetAvailableSpaces();
  const { mutate: checkAvailability, isPending: isChecking } =
    useCheckAvailability();
  const { mutate: createReservation, isPending: isCreating } =
    useCreateReservation();

  useEffect(() => {
    changeTitle("Crear reserva - La base");
  }, [changeTitle]);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema(spacesData?.spaces || [])),
    defaultValues: {
      spaceId: "",
      people: 1,
      fullRoom: false,
      startTime: "",
      endTime: "",
      date: undefined,
    },
  });

  const watchedValues = watch();
  const selectedSpace =
    spacesData?.spaces.find(
      (space: Space) => space.id === watchedValues.spaceId,
    ) || null;

  const handleCreateReservation = (
    availabilityData: AvailabilityRequest,
    data: ReservationFormData,
  ) => {
    const reservationData = {
      spaceId: data.spaceId,
      startTime: availabilityData.startTime,
      endTime: availabilityData.endTime,
      people: data.people,
      fullRoom: data.fullRoom,
    };

    createReservation(reservationData, {
      onSuccess: (res) => {
        toast.success("¡Reserva creada con éxito!", {
          description: `Tu código de reserva es ${res.codeQr}.`,
        });
        navigate(`/client/reservations/code/${res.codeQr}`);
      },
      onError: (err) => {
        toast.error("Error al crear la reserva", {
          description: err.message,
        });
      },
    });
  };

  const onSubmit = (data: ReservationFormData) => {
    if (!data.date || !data.startTime || !data.endTime || !data.spaceId) {
      toast.error("Datos incompletos", {
        description: "Por favor, completa todos los campos requeridos.",
      });
      return;
    }

    const availabilityData = {
      spaceId: data.spaceId,
      startTime: convertTimeToISO(data.date, data.startTime),
      endTime: convertTimeToISO(data.date, data.endTime),
    };

    checkAvailability(availabilityData, {
      onSuccess: (response) => {
        if (!response.available) {
          toast.error("Horario no disponible", {
            description:
              "El espacio seleccionado ya está reservado en este horario. Por favor, elige otro.",
          });
          return;
        }

        toast.success("¡Horario disponible!", {
          description: "Puedes proceder a crear tu reserva.",
        });

        handleCreateReservation(availabilityData, data);
      },
      onError: (err) => {
        toast.error("Error al verificar disponibilidad", {
          description: err.message,
        });
      },
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
            <CustomHeader
              title="Crear reserva"
              to={ROUTES.Client.ViewReservations}
            />
            {/* <Button
              type="submit"
              variant="default"
              disabled={isChecking || isCreating}
              className=" text-xs sm:text-sm"
            >
              {isChecking
                ? "Verificando..."
                : isCreating
                  ? "Creando reserva..."
                  : "Crear reserva"}
            </Button> */}
            <Button
              type="submit"
              variant="default"
              className=" text-xs sm:text-sm"
            >
              Pagar
            </Button>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-[600px_400px] justify-between">
          <div>
            <SpaceSelector
              spaces={spacesData?.spaces || []}
              isLoading={isLoadingSpaces}
              selectedSpace={watchedValues.spaceId || null}
              onSpaceSelect={(spaceId) => setValue("spaceId", spaceId)}
              error={errors.spaceId?.message}
            />

            <div className="mb-6  items-start gap-4 grid grid-cols-1 lg:grid-cols-2">
              <DateSelector
                date={watchedValues.date}
                onDateChange={(date) => setValue("date", date as Date)}
                error={errors.date?.message}
              />

              <PeopleCountInput
                value={watchedValues.people || 1}
                onChange={(value) => setValue("people", value)}
                minCapacity={selectedSpace?.capacityMin}
                maxCapacity={selectedSpace?.capacityMax}
                error={errors.people?.message}
              />
            </div>

            <TimeRangeSelector
              startTime={watchedValues.startTime || null}
              endTime={watchedValues.endTime || null}
              onStartTimeChange={(time) => setValue("startTime", time)}
              onEndTimeChange={(time) => setValue("endTime", time)}
              startTimeError={errors.startTime?.message}
              endTimeError={errors.endTime?.message}
            />

            <FullSpaceSwitch
              checked={watchedValues.fullRoom || false}
              onCheckedChange={(checked) => setValue("fullRoom", checked)}
              selectedSpace={selectedSpace}
              peopleCount={watchedValues.people || 1}
              error={errors.fullRoom?.message}
            />
          </div>

          <ReservationSummary
            selectedSpace={selectedSpace}
            date={watchedValues.date}
            startTime={watchedValues.startTime || null}
            endTime={watchedValues.endTime || null}
            personCount={watchedValues.people || 1}
            isFullSpace={watchedValues.fullRoom || false}
          />
        </div>
      </form>
    </div>
  );
}
