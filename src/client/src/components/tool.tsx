import { I18nTool } from "./i18n-tool";
import { ThemeTool } from "./theme-tool";

export const Tool = ({ relative = false }: { relative?: boolean }) => {
  if (relative) {
    return (
      <div className="flex items-center gap-4">
        <I18nTool />
        <ThemeTool />
      </div>
    );
  }

  return (
    <div
      className={
        "absolute right-4 top-4 xl:right-8 xl:top-8 flex items-center gap-4"
      }
    >
      <I18nTool />
      <ThemeTool />
    </div>
  );
};
