import z from "zod";
import type { Space } from "@/modules/client/space/features/get_spaces/types";

export const reservationSchema = (spaces: Space[]) =>
  z
    .object({
      spaceId: z.string().min(1, "Debes seleccionar un espacio"),
      date: z.date({
        required_error: "Debes seleccionar una fecha",
      }),
      startTime: z.string().min(1, "Este campo es requerido"),
      endTime: z.string().min(1, "Este campo es requerido"),
      people: z.number().min(1, "Debe haber al menos 1 persona"),
      fullRoom: z.boolean(),
    })
    .refine(
      (data) => {
        const selectedSpace = spaces.find((space) => space.id === data.spaceId);
        if (!selectedSpace) return true;

        if (
          data.people < selectedSpace.capacityMin ||
          data.people > selectedSpace.capacityMax
        ) {
          return false;
        }

        if (data.fullRoom && !selectedSpace.allowFullRoom) {
          return false;
        }

        if (!data.fullRoom && !selectedSpace.allowByUnit) {
          return false;
        }

        return true;
      },
      {
        message:
          "La configuración seleccionada no es válida para este espacio. Revisa la capacidad y modalidad permitida.",
        path: ["people"],
      }
    );
