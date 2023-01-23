import * as Yup from "yup";

export const workoutSchema = Yup.object()
  .shape({
    name: Yup.string().required(),
    // name: Yup.string(),
    userId: Yup.string().nullable(),
    routineId: Yup.string().nullable(),
    workoutStart: Yup.string().required(),
    workoutEnd: Yup.string().required(),
    // workoutStart: Yup.string(),
    // workoutEnd: Yup.string(),
    notes: Yup.string(),
    rating: Yup.number().integer().positive(),
    exercises: Yup.array().of(
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
    ),
  })
  .nullable();
