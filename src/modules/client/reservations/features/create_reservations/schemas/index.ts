import z from "zod";
import { availableSpaces } from "../constants";

export const reservationSchema = z
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
      // Validar que la cantidad de personas no exceda la capacidad del espacio
      const selectedSpace = availableSpaces.find(
        (space) => space.id === data.spaceId
      );
      if (selectedSpace && data.people > selectedSpace.capacity) {
        return false;
      }
      return true;
    },
    {
      message:
        "La cantidad de personas excede la capacidad del espacio seleccionado",
      path: ["people"],
    }
  );
