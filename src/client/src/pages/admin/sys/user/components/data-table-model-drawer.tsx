import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { UserEditContext } from "./data-table";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const { id, setId } = useContext(UserEditContext);
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
    queryClient.invalidateQueries({ queryKey: ["sysUserPage"] });
  };

  const form = useForm<SysUserCreateSchemaType | SysUserUpdateSchemaType>({
    resolver: zodResolver(
      id === MODEL_CREATE_FLAG_ID ? SysUserCreateSchema : SysUserUpdateSchema
    ),
    defaultValues,
  });

  const { data: modelInfo } = useQuery<IResult<SysUserDetailResponseType>>({
    queryKey: ["sysUserDetail", id],
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
    },
    onError: (error) => {
      toast({
        title: t("pages.common.toast.error.description"),
        variant: "destructive",
        description: error.message,
      });
    },
    onSettled: () => {
      closeDrawer();
    },
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
    },
    onError: (error) => {
      toast({
        title: t("pages.common.toast.error.description"),
        variant: "destructive",
        description: error.message,
      });
    },
    onSettled: () => {
      closeDrawer();
    },
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
      <DrawerContent className="h-[calc(100vh-100px)] px-8 flex flex-col max-w-4xl mx-auto">
        <DrawerHeader className="px-0">
          <DrawerTitle className="text-2xl">
            {id === MODEL_CREATE_FLAG_ID ? "Create User" : "Edit User"}
          </DrawerTitle>
          <DrawerDescription>
            {id === MODEL_CREATE_FLAG_ID
              ? "Create a new user account"
              : "Edit existing user account"}
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="flex-1 h-0 flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>基本信息</CardTitle>
                  <CardDescription>账号基本信息</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter email" />
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
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* status,superAdmin,gender,avatar */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={SYS_USER_STATUS.NORMAL}>
                                NORMAL
                              </SelectItem>
                              <SelectItem value={SYS_USER_STATUS.DISABLED}>
                                DISABLED
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                        <FormLabel>Super Admin</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(e) => field.onChange(e === "true")}
                            defaultValue={field.value ? "true" : "false"}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">true</SelectItem>
                              <SelectItem value="false">false</SelectItem>
                            </SelectContent>
                          </Select>
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
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={SYS_USER_GENDER.MALE}>
                                MALE
                              </SelectItem>
                              <SelectItem value={SYS_USER_GENDER.FEMALE}>
                                FEMALE
                              </SelectItem>
                              <SelectItem value={SYS_USER_GENDER.UNKNOWN}>
                                UNKNOWN
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                        <FormLabel>Avatar URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter avatar URL" />
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
                        <FormLabel>Nickname</FormLabel>
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
                        <FormLabel>Mobile</FormLabel>
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
                  <CardTitle>角色</CardTitle>
                  <CardDescription>账号角色</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="roleIds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
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
                ? "Create..."
                : "Create"
              : updatePending
              ? "Update..."
              : "Update"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
