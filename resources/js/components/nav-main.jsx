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

export function NavMain({ items = [] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.navItems.map((item, index) => (
                        <Tree key={index} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

function Tree({ item }) {
    const page = usePage();
    if (!item.items || item.items.length === 0) {
        const IconComponent = item.icon;
        return (
            <SidebarMenuItem>
                <SidebarMenuButton
                    tooltip={item.title}
                    className={['h-9 bg-gradient-to-r transition duration-300',
                        item.href === page.url
                            ? 'from-blue-950 to-blue-800 !text-white hover:!text-white'
                            : 'hover:from-blue-950 hover:to-blue-800 hover:!text-white',
                    ]}
                    asChild={!!item.href}
                >
                    {item.href ? (
                        <Link href={item.href}>
                            {IconComponent && <IconComponent />}
                            {item.title}
                        </Link>
                    ) : (
                        <>
                            {IconComponent && <IconComponent />}
                            {item.title}
                        </>
                    )}
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }

    const IconComponent = item.icon;
    return (
        <SidebarMenuItem>
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                defaultOpen={item.items.some(subItem => subItem.href === page.url)
                    || item.items.some(subItem => subItem.items && subItem.items.some(subSubItem => subSubItem.href === page.url))}
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className={['h-9 bg-gradient-to-r transition duration-300',
                        item.items.some(subItem => subItem.href === page.url)
                        || item.items.some(subItem => subItem.items && subItem.items.some(subSubItem => subSubItem.href === page.url))
                            ? 'from-blue-950 to-blue-800 !text-white hover:!text-white'
                            : 'hover:from-blue-950 hover:to-blue-800 hover:!text-white',
                    ].join(' ')}>
                        <ChevronRight className="transition-transform" />
                        {IconComponent ? <IconComponent /> : <Folder />}
                        <span title={item.title}>{item.title}</span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub className="truncate">
                        {item.items.map((subItem, index) => (
                            <Tree key={index} item={subItem} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
}
