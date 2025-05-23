import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { Home, UserCog2, Users2 } from 'lucide-react';
import AppLogo from './app-logo';
import { SearchDialog } from './search-dialog';

const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home,
    },
    {
        title: 'User Management',
        href: '/user-management',
        icon: Users2,
    },
    {
        title: 'Role Management',
        href: '/role-management',
        icon: UserCog2,
    }
    // {
    //     title: 'Main Modules',
    //     icon: LayoutGrid,
    //     items: [
    //         {
    //             title: 'Sub Module 1',
    //             href: '/dashboard/sub-module-1',
    //             icon: LayoutGrid,
    //         },
    //         {
    //             title: 'Sub Module 2',
    //             href: '/dashboard/sub-module-2',
    //             icon: LayoutGrid,
    //         },
    //     ],
    // },
    // {
    //     title: 'Reports',
    //     href: '#',
    //     icon: FileText,
    // },
    // {
    //     title: 'Master Setup',
    //     icon: Settings,
    //     items: [
    //         {
    //             title: 'Sub Module 1',
    //             href: '/dashboard/sub-module-1',
    //             icon: LayoutGrid,
    //         },
    //         {
    //             title: 'Sub Module 2',
    //             href: '/dashboard/sub-module-2',
    //             icon: LayoutGrid,
    //         },
    //     ],
    // },
    // {
    //     title: 'Security Module',
    //     href: '#',
    //     icon: Lock,
    // },
];

export function AppSidebar() {
    const { state, open } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SearchDialog
                    sidebarOpen={open}
                />
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
