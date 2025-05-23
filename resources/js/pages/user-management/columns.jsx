"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, MoreHorizontal } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import EditUserDialog from "./dialog/edit";
import ViewUserDialog from "./dialog/view";
import DeleteUserDialog from "./dialog/delete";
import DataTableColumnHeader from "@/components/data-table-column-header";
import { useTimeAgo } from "@/hooks/use-time-ago";

const NameCell = ({ row }) => {
    const { name, email } = row.original;
    return (
        <div className="flex flex-col">
            <div>{name}</div>
            <div className="text-sm text-muted-foreground">{email}</div>
        </div>
    );
};

const StatusCell = ({ row }) => {
    const { status, id } = row.original;
    const [isOpen, setIsOpen] = React.useState(false);

    const ReactSwal = withReactContent(Swal);

    const { data, setData, put, processing, errors } = useForm({
        status: status,
    });

    const handleStatusChange = (value) => {
        setData('status', value);
        setIsOpen(true);
    }

    const confirmStatusChange = (e) => {
        e.preventDefault();
        put(route('user-management.updateStatus', id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (response) => {
                setIsOpen(false);
                ReactSwal.fire({
                    title: 'Success',
                    text: response.props.flash.success,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            },
            onError: () => {
                setIsOpen(false);
                ReactSwal.fire({
                    title: 'Error',
                    text: 'Failed to change user status',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            },
            onFinish: () => {
                setIsOpen(false);
            },
        });
    }

    const cancelStatusChange = () => {
        setData('status', status);
        setIsOpen(false);
    }

    return (
        <>
            <Select value={data.status} onValueChange={handleStatusChange} disabled={processing}>
                <SelectTrigger className="h-8 text-xs capitalize">
                    <SelectValue placeholder={data.status} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
            </Select>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to change the status of <strong>{row.original.name}</strong> to {data.status} ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={cancelStatusChange}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmStatusChange} disabled={processing}>
                            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            <span>Confirm</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

const TimeAgoCell = ({ date }) => {
    const timeAgoString = useTimeAgo(date, 60000);

    const formattedDate = new Intl.DateTimeFormat('en-PH', {
        dateStyle: 'medium',
        timeStyle: 'short',
        hour12: true,
    }).format(date);

    return (
        <>
            <div className="text-sm text-muted-foreground">
                {formattedDate}
            </div>
            <div className="text-xs text-muted-foreground">
                {timeAgoString}
            </div>
        </>
    );
};

const ActionsCell = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <ViewUserDialog />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <EditUserDialog />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <DeleteUserDialog />
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const Columns = [
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => <NameCell row={row} />,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => <StatusCell row={row} />,
    },
    {
        accessorKey: 'updated_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" />,
        cell: ({ row }) => {
            const { updated_at } = row.original;
            const date = new Date(updated_at);

            return <TimeAgoCell date={date} />;
        }
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
        cell: ({ row }) => {
            const { created_at } = row.original;
            const date = new Date(created_at);

            return <TimeAgoCell date={date} />;
        }
    },
    {
        id: 'actions',
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => <ActionsCell row={row} />,
    },
];
