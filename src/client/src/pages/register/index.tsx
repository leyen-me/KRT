import { useMutation } from "@tanstack/react-query";

// External packages
import { t } from "@app/i18n";
import { IResult } from "@app/result";
import { RegisterSchemaType, RegisterResponseType } from "@app/model";

// Internal components & utils
import { RegisterForm } from "@/components/register-form";
import { ToastAction } from "@/components/ui/toast";
import { fetchSysAuthRegister } from "@/api/sys/auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate, isPending: registerPending } = useMutation<
    IResult<RegisterResponseType>,
    Error,
    RegisterSchemaType
  >({
    mutationFn: fetchSysAuthRegister,
    onSuccess: (res) => {
      const { message } = res;
      toast({
        title: t("pages.register.toast.success.description"),
        variant: "success",
        description: message,
      });
      navigate("/login");
    },
    onError: (error) => {
      toast({
        title: t("pages.register.toast.error.description"),
        variant: "destructive",
        description: error.message,
        action: (
          <ToastAction altText={t("pages.register.toast.error.try_again")}>
            {t("pages.register.toast.error.try_again")}
          </ToastAction>
        ),
      });
    },
  });

  const handleRegister = (values: RegisterSchemaType) => {
    mutate(values);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <RegisterForm
        registerLoading={registerPending}
        onRegister={handleRegister}
      />
    </div>
  );
}
