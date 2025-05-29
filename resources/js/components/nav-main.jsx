import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronRight, Folder } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Icon } from './icon';

export function NavMain({ toggleSidebar, sidebarOpen, items = [] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.navItems.map((item, index) => (
                        <Tree
                            key={index}
                            item={item}
                            toggleSidebar={toggleSidebar}
                            sidebarOpen={sidebarOpen}
                        />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

function Tree({ toggleSidebar, sidebarOpen, item }) {
    const page = usePage();

    const [isOpen, setIsOpen] = useState(() => {
        if (!item.items?.length) return false;
        return hasActiveChild(item, page.url);
    });

    // Close collapsible when sidebar closes
    useEffect(() => {
        if (!sidebarOpen) {
            setIsOpen(false);
        }
    }, [sidebarOpen]);

    const isMobile = useIsMobile();

    const handleOpenChange = (open) => {
        if (!sidebarOpen && !isMobile) {
            toggleSidebar();
            setIsOpen(true);
        } else {
            setIsOpen(open);
        }
    };

    // Leaf node (no sub-items)
    if (!item.items?.length) {
        const isActive = item.href === page.url;

        return (
            <SidebarMenuItem>
                <SidebarMenuButton
                    tooltip={item.title}
                    className={getButtonClassName(isActive)}
                    asChild={!!item.href}
                >
                    {item.href ? (
                        <Link href={item.href}>
                            {item.icon && <Icon iconNode={item.icon} />}
                            {item.title}
                        </Link>
                    ) : (
                        <>
                            {item.icon && <Icon iconNode={item.icon} />}
                            {item.title}
                        </>
                    )}
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }

    const isActive = hasActiveChild(item, page.url);

    return (
        <SidebarMenuItem>
            <Collapsible
                open={isOpen}
                onOpenChange={handleOpenChange}
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className={getButtonClassName(isActive)}>
                        {sidebarOpen
                            ? <ChevronRight className="transition-transform" />
                            : (item.icon && !isMobile)
                                ? <Icon iconNode={item.icon} />
                                : <ChevronRight className="transition-transform" />
                        }
                        {item.icon ? <Icon iconNode={item.icon} /> : <Folder />}
                        <span title={item.title}>{item.title}</span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub className="truncate">
                        {item.items.map((subItem, index) => (
                            <Tree
                                key={index}
                                item={subItem}
                                toggleSidebar={toggleSidebar}
                                sidebarOpen={sidebarOpen}
                            />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
}

// Helper functions
function hasActiveChild(item, currentUrl) {
    if (!item.items?.length) return false;

    return item.items.some(subItem =>
        subItem.href === currentUrl ||
        (subItem.items?.length && hasActiveChild(subItem, currentUrl))
    );
}

function getButtonClassName(isActive) {
    const baseClasses = 'h-9 bg-gradient-to-r transition duration-300';
    const activeClasses = 'from-blue-950 to-[#1B4298] !text-white hover:!text-white';
    const inactiveClasses = 'hover:from-blue-950 hover:to-[#1B4298] hover:!text-white';

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
}
