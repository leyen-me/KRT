import { I18nTool } from "./i18n-tool";
import { ThemeTool } from "./theme-tool";

export const Tool = () => {
  return (
    <div className="absolute right-4 top-4 xl:right-8 xl:top-8 flex items-center gap-4">
      <I18nTool />
      <ThemeTool />
    </div>
  );
};
