import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, useSidebar } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { Cog, Home, UserCog2, Users2 } from 'lucide-react';
import AppLogo from './app-logo';
import { SearchDialog } from './search-dialog';
import AppLogoBanner from './app-logo-banner';

const data = {
    navItems: [
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
        },
        {
            title: 'Master',
            icon: Cog,
            items: [
                {
                    title: 'Branch / Office Management',
                    href: '#',
                    items: [
                        {
                            title: 'Branch',
                            href: '/dashboard',
                        },
                        {
                            title: 'Group',
                            href: '/user-management',
                        }, {
                            title: 'Division',
                            href: '/role-management',
                        },
                        {
                            title: 'Department',
                            href: '#',
                        },
                        {
                            title: 'Section',
                            href: '#',
                        },
                    ],
                },
            ],
        },
    ]
}


export function AppSidebar() {
    const { open, toggleSidebar } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <div className='md:hidden'>
                                    <AppLogoBanner sidebarOpen={open} />
                                </div>
                                <div className='hidden md:block'>
                                    <AppLogo sidebarOpen={open} />
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SearchDialog
                    sidebarOpen={open}
                />
            </SidebarHeader>

            <SidebarContent>
                <NavMain toggleSidebar={toggleSidebar} sidebarOpen={open} items={data} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
