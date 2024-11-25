import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { t } from "@app/i18n";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">{t("pages.error.not_found.title")}</span>
        <p className="text-center text-muted-foreground">
          {t("pages.error.not_found.desc")}
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            {t("pages.error.not_found.back")}
          </Button>
          <Button onClick={() => navigate("/")}>
            {t("pages.error.not_found.home")}
          </Button>
        </div>
      </div>
    </div>
  );
}
