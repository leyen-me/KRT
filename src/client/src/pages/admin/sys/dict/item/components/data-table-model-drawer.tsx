import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { DictItemEditContext, DictItemEditContextType } from "./data-table";
import { useState, useContext, useEffect } from "react";
import { zodResolver } from "@/utils/zodUtils";
import {
  SYS_DICT_ITEM_VARIANT,
  SysDictItemCreateResponseType,
  SysDictItemCreateSchema,
  SysDictItemCreateSchemaType,
  SysDictItemDetailResponseType,
  SysDictItemUpdateResponseType,
  SysDictItemUpdateSchema,
  SysDictItemUpdateSchemaType,
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
import { t } from "@app/i18n";
import { useToast } from "@/hooks/use-toast";
import { QUERY_KEY } from "@/constants/query-key";
import {
  fetchSysDictItemCreate,
  fetchSysDictItemDetail,
  fetchSysDictItemUpdate,
} from "@/api/sys/dict/item";
import { DictContext, DictContextType } from "../..";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { I18nComboBox } from "@/components/i18n-combo-box";

export function DataTableModelDrawer() {
  // common hook
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { activeDict } = useContext(DictContext) as DictContextType;

  const defaultValues = {
    transKey: "",
    dictId: activeDict,
    value: "",
    sort: 1,
    variant: SYS_DICT_ITEM_VARIANT.default,
  };

  // user edit context
  const { id, setId } = useContext(
    DictItemEditContext
  ) as DictItemEditContextType;
  useEffect(() => {
    form.clearErrors();
    form.reset(defaultValues as SysDictItemCreateSchemaType);
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
      queryKey: [QUERY_KEY.SYS_DICT_ITEM_LIST],
    });
  };

  const form = useForm<
    SysDictItemCreateSchemaType | SysDictItemUpdateSchemaType
  >({
    resolver: zodResolver(
      id === MODEL_CREATE_FLAG_ID
        ? SysDictItemCreateSchema
        : SysDictItemUpdateSchema
    ),
    defaultValues: defaultValues as SysDictItemCreateSchemaType,
  });

  const { data: modelInfo } = useQuery<IResult<SysDictItemDetailResponseType>>({
    queryKey: [QUERY_KEY.SYS_DICT_ITEM_DETAIL, id],
    queryFn: () => fetchSysDictItemDetail(id),
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
      form.reset(data as SysDictItemUpdateSchemaType);
    }
  }, [modelInfo]);

  const { mutate: mutateCreate, isPending: createPending } = useMutation<
    IResult<SysDictItemCreateResponseType>,
    Error,
    SysDictItemCreateSchemaType
  >({
    mutationFn: fetchSysDictItemCreate,
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
    IResult<SysDictItemUpdateResponseType>,
    Error,
    SysDictItemUpdateSchemaType
  >({
    mutationFn: fetchSysDictItemUpdate,
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
    data: SysDictItemCreateSchemaType | SysDictItemUpdateSchemaType
  ) => {
    if (id === MODEL_CREATE_FLAG_ID) {
      mutateCreate(data as SysDictItemCreateSchemaType);
    } else {
      mutateUpdate(data as SysDictItemUpdateSchemaType);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[calc(100vh-100px)] px-8 flex flex-col max-w-4xl mx-auto">
        <DrawerHeader className="px-0">
          <DrawerTitle className="text-2xl">
            {id === MODEL_CREATE_FLAG_ID
              ? t(
                  "pages.admin.sys.dict.item.data_table.model.drawer.header.create_title"
                )
              : t(
                  "pages.admin.sys.dict.item.data_table.model.drawer.header.update_title"
                )}
          </DrawerTitle>
          <DrawerDescription>
            {id === MODEL_CREATE_FLAG_ID
              ? t(
                  "pages.admin.sys.dict.item.data_table.model.drawer.header.create_description"
                )
              : t(
                  "pages.admin.sys.dict.item.data_table.model.drawer.header.update_description"
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
                      "pages.admin.sys.dict.item.data_table.model.drawer.card1.base_title"
                    )}
                  </CardTitle>
                  <CardDescription>
                    {t(
                      "pages.admin.sys.dict.item.data_table.model.drawer.card1.base_description"
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <FormField
                    control={form.control}
                    name="transKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t(
                            "pages.admin.sys.dict.item.data_table.columns.name"
                          )}
                        </FormLabel>
                        <FormControl>
                          <I18nComboBox
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t(
                            "pages.admin.sys.dict.item.data_table.columns.value"
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
                    name="sort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t(
                            "pages.admin.sys.dict.item.data_table.columns.sort"
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => {
                              const value =
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="variant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t(
                            "pages.admin.sys.dict.item.data_table.columns.variant"
                          )}
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(SYS_DICT_ITEM_VARIANT).map(
                                ([key, value]) => (
                                  <SelectItem key={key} value={value}>
                                    {key}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
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
