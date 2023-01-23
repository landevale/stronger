import * as Yup from "yup";

export const workoutSchema = Yup.object()
  .shape({
    name: Yup.string().required(),
    userId: Yup.string().nullable(),
    routineId: Yup.string().nullable(),
    workoutStart: Yup.string().required(),
    workoutEnd: Yup.string().required(),
    notes: Yup.string(),
    rating: Yup.number().integer().positive(),
    exercises: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
          sets: Yup.array()
            .of(
              Yup.object().shape({
                reps: Yup.number().integer().positive(),
                weight: Yup.number().positive().nullable(),
              })
            )
            .nullable(),
        })
      )
      .nullable(),
  })
  .nullable();
