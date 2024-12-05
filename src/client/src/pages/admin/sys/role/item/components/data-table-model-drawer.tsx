import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { UserRoleEditContext, UserRoleEditContextType } from "./data-table";
import { useState, useContext, useEffect } from "react";
import { zodResolver } from "@/utils/zodUtils";
import {
  SysUserRoleCreateResponseType,
  SysUserRoleCreateSchema,
  SysUserRoleCreateSchemaType,
  SysUserRoleDetailResponseType,
  SysUserRoleUpdateResponseType,
  SysUserRoleUpdateSchema,
  SysUserRoleUpdateSchemaType,
} from "@app/server/src/model";
import { MODEL_CREATE_FLAG_ID } from "@/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IResult } from "@app/result";
import { t } from "@app/i18n";
import { useToast } from "@/hooks/use-toast";
import { QUERY_KEY } from "@/constants/query-key";
import {
  fetchSysUserRoleCreate,
  fetchSysUserRoleDetail,
  fetchSysUserRoleUpdate,
} from "@/api/sys/user/role";
import { RoleContext, RoleContextType } from "../..";
import { SysUserComboBox } from "@/components/sys-user-combo-box";

export function DataTableModelDrawer() {
  // common hook
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { activeRole } = useContext(RoleContext) as RoleContextType;

  const defaultValues = {
    roleId: activeRole,
    userId: "",
  };

  // user edit context
  const { id, setId } = useContext(
    UserRoleEditContext
  ) as UserRoleEditContextType;
  useEffect(() => {
    form.clearErrors();
    form.reset(defaultValues as SysUserRoleCreateSchemaType);
    setOpen(!!id);
  }, [id]);

  // drawer open state
  const [open, setOpen] = useState(!!id);
  const onOpenChange = (openFlag: boolean) => {
    if (!openFlag) {
      setId({ id: "" });
    }
    setOpen(openFlag);
  };
  const closeDrawer = () => {
    setId({ id: "" });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.SYS_USER_ROLE_PAGE],
    });
  };

  const form = useForm<
    SysUserRoleCreateSchemaType | SysUserRoleUpdateSchemaType
  >({
    resolver: zodResolver(
      id === MODEL_CREATE_FLAG_ID
        ? SysUserRoleCreateSchema
        : SysUserRoleUpdateSchema
    ),
    defaultValues: defaultValues as SysUserRoleCreateSchemaType,
  });

  const { data: modelInfo } = useQuery<IResult<SysUserRoleDetailResponseType>>({
    queryKey: [QUERY_KEY.SYS_USER_ROLE_DETAIL, id],
    queryFn: () => fetchSysUserRoleDetail(id),
    // refetch on mount
    refetchOnMount: true,
    staleTime: 0,
    enabled: !!id && id !== MODEL_CREATE_FLAG_ID,
  });

  useEffect(() => {
    if (modelInfo?.data) {
      // remove null value
      const data = Object.fromEntries(
        Object.entries(modelInfo.data).filter(([_, value]) => value !== null)
      );
      form.reset(data as SysUserRoleUpdateSchemaType);
    }
  }, [modelInfo]);

  const { mutate: mutateCreate, isPending: createPending } = useMutation<
    IResult<SysUserRoleCreateResponseType>,
    Error,
    SysUserRoleCreateSchemaType
  >({
    mutationFn: fetchSysUserRoleCreate,
    onSuccess: (res) => {
      const { message } = res;
      toast({
        title: t("pages.common.toast.success.description"),
        variant: "success",
        description: message,
      });
      closeDrawer();
    },
    onError: (error) => {
      toast({
        title: t("pages.common.toast.error.description"),
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const { mutate: mutateUpdate, isPending: updatePending } = useMutation<
    IResult<SysUserRoleUpdateResponseType>,
    Error,
    SysUserRoleUpdateSchemaType
  >({
    mutationFn: fetchSysUserRoleUpdate,
    onSuccess: (res) => {
      const { message } = res;
      toast({
        title: t("pages.common.toast.success.description"),
        variant: "success",
        description: message,
      });
      closeDrawer();
    },
    onError: (error) => {
      toast({
        title: t("pages.common.toast.error.description"),
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const onSubmit = (
    data: SysUserRoleCreateSchemaType | SysUserRoleUpdateSchemaType
  ) => {
    if (id === MODEL_CREATE_FLAG_ID) {
      mutateCreate(data as SysUserRoleCreateSchemaType);
    } else {
      mutateUpdate(data as SysUserRoleUpdateSchemaType);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[calc(100vh-100px)] px-8 flex flex-col max-w-4xl mx-auto">
        <DrawerHeader className="px-0">
          <DrawerTitle className="text-2xl">
            {id === MODEL_CREATE_FLAG_ID
              ? t(
                  "pages.admin.sys.role.item.data_table.model.drawer.header.create_title"
                )
              : t(
                  "pages.admin.sys.role.item.data_table.model.drawer.header.update_title"
                )}
          </DrawerTitle>
          <DrawerDescription>
            {id === MODEL_CREATE_FLAG_ID
              ? t(
                  "pages.admin.sys.role.item.data_table.model.drawer.header.create_description"
                )
              : t(
                  "pages.admin.sys.role.item.data_table.model.drawer.header.update_description"
                )}
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="flex-1 h-0 flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t(
                      "pages.admin.sys.role.item.data_table.model.drawer.card1.base_title"
                    )}
                  </CardTitle>
                  <CardDescription>
                    {t(
                      "pages.admin.sys.role.item.data_table.model.drawer.card1.base_description"
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t(
                            "pages.admin.sys.role.item.data_table.columns.userId"
                          )}
                        </FormLabel>
                        <FormControl>
                          <SysUserComboBox
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </form>
          </Form>
        </ScrollArea>

        <DrawerFooter className="w-full px-0">
          <Button
            disabled={createPending || updatePending}
            onClick={() => {
              form.handleSubmit(onSubmit)();
            }}
          >
            {id === MODEL_CREATE_FLAG_ID
              ? createPending
                ? t("pages.common.data_table.model.drawer.create") + "..."
                : t("pages.common.data_table.model.drawer.create")
              : updatePending
              ? t("pages.common.data_table.model.drawer.update") + "..."
              : t("pages.common.data_table.model.drawer.update")}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">
              {t("pages.common.data_table.model.drawer.cancel")}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
