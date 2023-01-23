import * as Yup from "yup";

// export const routineSchema = Yup.object()
//   .shape({
//     name: Yup.string().required("Is required"),
//     user_id: Yup.string().nullable(),
//     exercises: Yup.array().of(
//       Yup.object()
//         .shape({
//           name: Yup.string().required().nullable(),
//           sets: Yup.object()
//             .shape({
//               reps: Yup.number().integer().positive(),
//               weight: Yup.number().positive(),
//             })
//             .nullable(),
//         })
//         .nullable()
//     ),
//   })
//   .nullable();

export const routineSchema = Yup.object()
  .shape({
    name: Yup.string().required("Is required"),
    userId: Yup.string().nullable(),
    exercises: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(),
        sets: Yup.object()
          .shape({
            reps: Yup.number().integer().positive(),
            weight: Yup.number().positive(),
          })
          .nullable(),
      })
    ),
  })
  .nullable();
