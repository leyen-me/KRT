import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { UserEditContext, UserEditContextType } from "./data-table";
import { useState, useContext, useEffect } from "react";
import { zodResolver } from "@/utils/zodUtils";
import {
  SYS_USER_GENDER,
  SYS_USER_STATUS,
  SysUserCreateResponseType,
  SysUserCreateSchema,
  SysUserCreateSchemaType,
  SysUserDetailResponseType,
  SysUserUpdateResponseType,
  SysUserUpdateSchema,
  SysUserUpdateSchemaType,
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
import { Input } from "@/components/ui/input";
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
import {
  fetchSysUserCreate,
  fetchSysUserDetail,
  fetchSysUserUpdate,
} from "@/api/sys/user";
import { t } from "@app/i18n";
import { useToast } from "@/hooks/use-toast";
import { QUERY_KEY } from "@/constants/query-key";
import { DictSelect } from "@/components/dict-select";

export function DataTableModelDrawer() {
  // common hook
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const defaultValues = {
    email: "",
    password: "",
    status: SYS_USER_STATUS.NORMAL,
    superAdmin: false,
    nickname: "",
    gender: SYS_USER_GENDER.UNKNOWN,
    mobile: "",
    avatar: "",
    roleIds: [],
  };

  // user edit context
  const { id, setId } = useContext(UserEditContext) as UserEditContextType;
  useEffect(() => {
    form.clearErrors();
    form.reset(defaultValues);
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
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SYS_USER_PAGE] });
  };

  const form = useForm<SysUserCreateSchemaType | SysUserUpdateSchemaType>({
    resolver: zodResolver(
      id === MODEL_CREATE_FLAG_ID ? SysUserCreateSchema : SysUserUpdateSchema
    ),
    defaultValues,
  });

  const { data: modelInfo } = useQuery<IResult<SysUserDetailResponseType>>({
    queryKey: [QUERY_KEY.SYS_USER_DETAIL, id],
    queryFn: () => fetchSysUserDetail(id),
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
      form.reset(data as SysUserUpdateSchemaType);
    }
  }, [modelInfo]);

  const { mutate: mutateCreate, isPending: createPending } = useMutation<
    IResult<SysUserCreateResponseType>,
    Error,
    SysUserCreateSchemaType
  >({
    mutationFn: fetchSysUserCreate,
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
    onSettled: () => { },
  });

  const { mutate: mutateUpdate, isPending: updatePending } = useMutation<
    IResult<SysUserUpdateResponseType>,
    Error,
    SysUserUpdateSchemaType
  >({
    mutationFn: fetchSysUserUpdate,
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
    onSettled: () => { },
  });

  const onSubmit = (
    data: SysUserCreateSchemaType | SysUserUpdateSchemaType
  ) => {
    if (id === MODEL_CREATE_FLAG_ID) {
      mutateCreate(data as SysUserCreateSchemaType);
    } else {
      mutateUpdate(data as SysUserUpdateSchemaType);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[calc(100vh-100px)] px-8 flex flex-col max-w-4xl mx-auto">
        <DrawerHeader className="px-0">
          <DrawerTitle className="text-2xl">
            {id === MODEL_CREATE_FLAG_ID
              ? t(
                "pages.admin.sys.user.data_table.model.drawer.header.create_title"
              )
              : t(
                "pages.admin.sys.user.data_table.model.drawer.header.update_title"
              )}
          </DrawerTitle>
          <DrawerDescription>
            {id === MODEL_CREATE_FLAG_ID
              ? t(
                "pages.admin.sys.user.data_table.model.drawer.header.create_description"
              )
              : t(
                "pages.admin.sys.user.data_table.model.drawer.header.update_description"
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
                      "pages.admin.sys.user.data_table.model.drawer.card1.base_title"
                    )}
                  </CardTitle>
                  <CardDescription>
                    {t(
                      "pages.admin.sys.user.data_table.model.drawer.card1.base_description"
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("pages.admin.sys.user.data_table.columns.email")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="a@example.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {id === MODEL_CREATE_FLAG_ID && (
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t(
                              "pages.admin.sys.user.data_table.columns.password"
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("pages.admin.sys.user.data_table.columns.status")}
                        </FormLabel>
                        <FormControl>
                          <DictSelect code='sys_user_status' value={field.value} onChange={field.onChange}></DictSelect>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="superAdmin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t(
                            "pages.admin.sys.user.data_table.columns.super_admin"
                          )}
                        </FormLabel>
                        <FormControl>
                          <DictSelect code='sys_yes_no' value={field.value} onChange={field.onChange}></DictSelect>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("pages.admin.sys.user.data_table.columns.gender")}
                        </FormLabel>
                        <FormControl>
                        <DictSelect code='sys_user_gender' value={field.value} onChange={field.onChange}></DictSelect>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("pages.admin.sys.user.data_table.columns.avatar")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t(
                            "pages.admin.sys.user.data_table.columns.nickname"
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("pages.admin.sys.user.data_table.columns.mobile")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t(
                      "pages.admin.sys.user.data_table.model.drawer.card2.role_title"
                    )}
                  </CardTitle>
                  <CardDescription>
                    {t(
                      "pages.admin.sys.user.data_table.model.drawer.card2.role_description"
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="roleIds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("pages.admin.sys.user.data_table.columns.roleIds")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
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
