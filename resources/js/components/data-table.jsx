import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import * as React from "react"
import { Input } from "./ui/input"
import { Search } from "lucide-react"
import DataTablePagination from "./data-table-pagination"

export default function DataTable({ columns, data, action, hasSearch }) {

    const [sorting, setSorting] = React.useState([])
    const [globalFilter, setGlobalFilter] = React.useState('')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter,
        }
    })

    return (
        <div className="m-4">
            <div className={hasSearch ? ' flex items-center py-4 justify-between' : 'flex items-center py-4 justify-end'}>
                {hasSearch && <div className="relative flex items-center">
                    <Input type="search"
                        placeholder="Search..."
                        value={globalFilter ?? ""}
                        onChange={e => table.setGlobalFilter(String(e.target.value))}
                        className="pl-7 h-8 w-[150px] lg:w-[250px]"
                    />
                    <span className="absolute inset-y-0 flex items-center justify-center px-2 start-0">
                        <Search className="size-4 text-muted-foreground" />
                    </span>
                </div>}
                {action}
            </div>
            <div className="p-2 border rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div >
    )
}
