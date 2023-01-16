import * as Yup from "yup";

export const routineSchema = Yup.object().shape({
  name: Yup.string().required("Is required"),
  user_id: Yup.string(),
  exercises: [
    {
      name: { type: String, required: true },
      sets: Yup.object().shape({
        reps: Yup.number().integer().positive(),
        weight: Yup.number().positive(),
      }),
    },
  ],
});
