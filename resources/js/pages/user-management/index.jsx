import AppLayout from "@/layouts/app-layout";
import DataTable from "@/components/data-table";
import { Head } from "@inertiajs/react";
import { Columns } from "./columns";
import CreateUserDialog from "./dialog/create";

const breadcrumbs = [
    {
        title: 'User Management',
        href: '/user-management',
    },
];

export default function UserManagement({ users }) {
    const data = users;
    const columns = Columns

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <DataTable columns={columns} data={data} action={<CreateUserDialog />} hasSearch />
        </AppLayout>
    )
}
