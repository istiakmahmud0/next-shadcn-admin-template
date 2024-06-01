"use client";
import { DataTable } from "@/components/custom/Datatable";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
// import { getFuzzyVectorFn } from "@tanstack/match-sorter-utils";

const UsersPage = () => {
  const data = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      balance: 2500.5,
      invoice: "INV-001",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      balance: 3700.75,
      invoice: "INV-002",
    },
    {
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      balance: 420.0,
      invoice: "INV-003",
    },
    {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      balance: 1500.25,
      invoice: "INV-004",
    },
    {
      name: "Daniel Brown",
      email: "daniel.brown@example.com",
      balance: 800.9,
      invoice: "INV-005",
    },
    {
      name: "Olivia Wilson",
      email: "olivia.wilson@example.com",
      balance: 1280.3,
      invoice: "INV-006",
    },
    {
      name: "David Martinez",
      email: "david.martinez@example.com",
      balance: 2650.5,
      invoice: "INV-007",
    },
    {
      name: "Sophia Anderson",
      email: "sophia.anderson@example.com",
      balance: 945.1,
      invoice: "INV-008",
    },
    {
      name: "James Taylor",
      email: "james.taylor@example.com",
      balance: 3200.45,
      invoice: "INV-009",
    },
    {
      name: "Mia Moore",
      email: "mia.moore@example.com",
      balance: 500.75,
      invoice: "INV-010",
    },
    {
      name: "Benjamin White",
      email: "benjamin.white@example.com",
      balance: 735.6,
      invoice: "INV-011",
    },
    {
      name: "Ava Harris",
      email: "ava.harris@example.com",
      balance: 2100.3,
      invoice: "INV-012",
    },
    {
      name: "Lucas Clark",
      email: "lucas.clark@example.com",
      balance: 640.8,
      invoice: "INV-013",
    },
    {
      name: "Amelia Lewis",
      email: "amelia.lewis@example.com",
      balance: 780.9,
      invoice: "INV-014",
    },
    {
      name: "William Walker",
      email: "william.walker@example.com",
      balance: 3050.4,
      invoice: "INV-015",
    },
    {
      name: "Charlotte Hall",
      email: "charlotte.hall@example.com",
      balance: 2900.85,
      invoice: "INV-016",
    },
    {
      name: "Elijah Young",
      email: "elijah.young@example.com",
      balance: 1220.75,
      invoice: "INV-017",
    },
    {
      name: "Avery King",
      email: "avery.king@example.com",
      balance: 610.5,
      invoice: "INV-018",
    },
    {
      name: "Henry Wright",
      email: "henry.wright@example.com",
      balance: 4500.2,
      invoice: "INV-019",
    },
    {
      name: "Ella Scott",
      email: "ella.scott@example.com",
      balance: 1350.6,
      invoice: "INV-020",
    },
  ];

  const pageTitle = "Users";
  const columns: ColumnDef<NonNullable<typeof data>[number]>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "balance",
      header: "Balance",
    },
    {
      accessorKey: "invoice",
      header: "invoice",
    },
    {
      id: "actions",
      cell: ActionsCell,
    },
  ];

  function ActionsCell({ row }: any) {
    const [openModal, setOpenModal] = useState(null);

    const handleOpenModal = (modal: any) => {
      setOpenModal(modal);
    };

    const handleCloseModal = () => {
      setOpenModal(null);
    };
    return (
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" id="moreHorizontal">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          {/* Edit modal */}
          <DropdownMenuContent align="end">
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <span id="edit">Edit</span>
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuItem></DropdownMenuItem>
            {/* Delete modal */}
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <span id="delete">Delete</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action of remove
              <span className="text-red-500"> Name</span>cannot be undone. Are
              you sure you want to permanently delete this file from our
              servers?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-green-700 hover:bg-slate-500" id="cancel">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="bg-red-700 hover:bg-slate-500" id="confirm">
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // if (status === "pending" || status === "error") return <Loading />;
  // else {
  return (
    <div>
      {/* create form */}
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Username</Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* send data in data table */}
      <DataTable
        columns={columns}
        data={data!}
        // searchParam={searchParam}
        pageTitle={pageTitle}
      />
    </div>
  );
  // }
};

export default UsersPage;
