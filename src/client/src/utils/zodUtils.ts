import { t } from "@app/i18n";
import { z, ZodSchema } from "@app/server/src/model";

export const zodResolver = (schema: ZodSchema) => {
  return async (values: any) => {
    try {
      const validatedData = await schema.parseAsync(values);
      return {
        values: validatedData,
        errors: {},
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        let errors = {};
        errors = error.issues.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.path[0]]: {
              type: curr.code,
              message: t(curr.message),
            },
          }),
          {}
        );
        return {
          values: {},
          errors: errors,
        };
      }
      return {
        values: {},
        errors: {},
      };
    }
  };
};
