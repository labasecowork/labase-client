import { Button } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SpaceSelector,
  DateSelector,
  PeopleCountInput,
  TimeRangeSelector,
  FullSpaceSwitch,
  ReservationSummary,
} from "../components";
import type { ReservationFormData } from "../types";
import { reservationSchema } from "../schemas";
import { availableSpaces } from "../constants";
import { convertTimeToISO } from "@/utilities";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export default function CreateReservationPage() {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      spaceId: "",
      people: 1,
      fullRoom: false,
      startTime: "",
      endTime: "",
    },
  });

  const watchedValues = watch();
  const selectedSpace =
    availableSpaces.find((space) => space.id === watchedValues.spaceId) || null;

  const onSubmit = (data: ReservationFormData) => {
    if (!data.date) return;

    const reservationData = {
      spaceId: data.spaceId,
      startTime: convertTimeToISO(data.date as Date, data.startTime),
      endTime: convertTimeToISO(data.date as Date, data.endTime),
      people: data.people,
      fullRoom: data.fullRoom,
    };

    console.log(
      "Datos de la reserva:",
      JSON.stringify(reservationData, null, 2)
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <Link
                to={ROUTES.Client.ViewReservations}
                className="bg-stone-50 size-12 flex items-center justify-center rounded-full border-none shadow-none transition-all hover:bg-stone-100"
              >
                <ArrowLeftIcon className="size-4" />
              </Link>
              <h2 className="text-2xl font-bold text-stone-900 mt-4">
                Crear reserva
              </h2>
            </div>
            <Button type="submit" variant="default">
              Crear reserva
            </Button>
          </div>
        </div>
        <div className="w-full grid grid-cols-[600px_400px] justify-between">
          <div>
            <SpaceSelector
              spaces={availableSpaces}
              selectedSpace={watchedValues.spaceId || null}
              onSpaceSelect={(spaceId) => setValue("spaceId", spaceId)}
              error={errors.spaceId?.message}
            />

            <div className="mb-6 flex items-start gap-4">
              <DateSelector
                date={watchedValues.date}
                onDateChange={(date) => setValue("date", date as Date)}
                error={errors.date?.message}
              />

              <PeopleCountInput
                value={watchedValues.people || 1}
                onChange={(value) => setValue("people", value)}
                maxCapacity={selectedSpace?.capacity}
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
