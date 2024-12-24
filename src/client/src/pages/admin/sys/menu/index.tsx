import { DataTable } from "@/components/table-tree";
// import { columns } from "../role/components/columns";

const columns = [
  {
    accessorKey: "name",
    header: "名称",
  },
  {
    accessorKey: "age",
    header: "年龄",
  },
];

const data = [
  {
    id: "1",
    name: "父节点1",
    age: 50,
    children: [
      {
        id: "1-1",
        name: "子节点1-1",
        age: 25,
      },
      {
        id: "1-2",
        name: "子节点1-2",
        age: 22,
      },
    ],
  },
  {
    id: "2",
    name: "父节点2",
    age: 45,
    children: [
      {
        id: "2-1",
        name: "子节点2-1",
        age: 20,
      },
    ],
  },
];

export default function SysMenuPage() {
  return <DataTable columns={columns} data={data} />;
}
