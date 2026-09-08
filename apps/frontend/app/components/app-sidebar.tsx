import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  Check,
  House,
  Layers,
  CheckSquare,
  BarChart3,
  ChevronsUpDown,
  LogOut,
  Plus,
  CreditCard,
  Bell,
  BadgeCheck,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '~/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { WorkspaceDialog } from '~/components/workspace-dialog';
import { useActiveOrganization, useListOrganizations, useSession, organization, signOut } from '~/lib/auth-client';
import { cn } from '~/lib/utils';
import { Skeleton } from './ui/skeleton';
import { toast } from './ui/toast';

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: session } = useSession();
  const { data: activeOrg } = useActiveOrganization();
  const { data: organizations } = useListOrganizations();

  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false);

  const user = session?.user;
  const currentOrgName = activeOrg?.name ?? '';
  const currentOrgInitial = currentOrgName.charAt(0).toUpperCase();

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const handleSwitchWorkspace = async (orgId: string) => {
    try {
      await organization.setActive({ organizationId: orgId });
      window.location.reload();
    } catch (err) {
      toast.add({
        type: 'error',
        title: 'Error switching workspace',
        description: 'Please try again',
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = '/login';
          },
        },
      });
    } catch {
      window.location.href = '/login';
    }
  };

  const isItemActive = (url: string) => {
    return location.pathname.startsWith(url);
  };

  const mainNavigation = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: House,
    },
    {
      title: 'Presets',
      url: '/presets',
      icon: Layers,
    },
    {
      title: 'Tasks',
      url: '/tasks',
      icon: CheckSquare,
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: BarChart3,
    },
  ];

  const userDropdownItems = [
    {
      title: 'Profile',
      url: '/settings?tab=profile',
      icon: BadgeCheck,
    },
    {
      title: 'Billing & Plan',
      url: '/settings?tab=billing',
      icon: CreditCard,
    },
    {
      title: 'Notifications',
      url: '/settings?tab=notifications',
      icon: Bell,
    },
  ];

  return (
    <>
      <Sidebar>
        {/* Workspace Switcher Header */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
                  {currentOrgName ? (
                    <div className="flex flex-row w-full items-center justify-center gap-2">
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary font-semibold text-sm">
                        {currentOrgInitial}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{currentOrgName}</span>
                        <span className="text-xs">Workspace</span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-62.5" />
                        <Skeleton className="h-4 w-50" />
                      </div>
                    </div>
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" side="right">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Workspaces</DropdownMenuLabel>

                    {organizations &&
                      organizations.map((org) => {
                        const isSelected = activeOrg?.id ? activeOrg.id === org.id : org.name === currentOrgName;
                        return (
                          <DropdownMenuItem
                            key={org.id}
                            onClick={() => handleSwitchWorkspace(org.id)}
                            className="cursor-pointer hover:bg-accent"
                          >
                            <div className="flex size-7 items-center justify-center rounded-md border font-semibold">
                              {org.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="flex-1 truncate font-medium">{org.name}</span>
                            {isSelected && <Check />}
                          </DropdownMenuItem>
                        );
                      })}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => setCreateWorkspaceOpen(true)}
                    className="cursor-pointer gap-2 rounded-lg p-2 border hover:bg-accent"
                  >
                    <Plus className="size-4" />
                    <span>Create workspace</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent className="bg-white">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {mainNavigation.map((item) => {
                  const active = isItemActive(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={<Link to={item.url} />}
                        isActive={active}
                        tooltip={item.title}
                        className="p-2"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Footer Profile */}
        <SidebarFooter className="p-2 bg-white">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
                  {user ? (
                    <Avatar className="size-8">
                      {user?.image ? <AvatarImage src={user.image} alt={user.name || 'User'} /> : null}
                      <AvatarFallback className=" bg-foreground text-background">{userInitials}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-62.5" />
                        <Skeleton className="h-4 w-50" />
                      </div>
                    </div>
                  )}
                  <div className="grid flex-1 text-left text-xs leading-tight ml-2">
                    <span className="truncate font-semibold text-foreground">{user?.name || 'My Account'}</span>
                    <span className="truncate text-[11px] text-muted-foreground font-normal">
                      {user?.email || 'account@sobr.com'}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
                </DropdownMenuTrigger>

                <DropdownMenuContent side="top" align="start" sideOffset={6}>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div className="flex items-center gap-2 py-1">
                        <Avatar className="size-8">
                          <AvatarFallback className=" bg-foreground text-background font-semibold text-xs">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-xs leading-tight">
                          <span className="truncate font-semibold text-foreground">{user?.name || 'User'}</span>
                          <span className="truncate text-[11px] text-muted-foreground">{user?.email}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {userDropdownItems.map((item) => (
                      <DropdownMenuItem
                        key={item.url}
                        onClick={() => navigate(item.url)}
                        className={cn('bg-transparent hover:bg-accent cursor-pointer')}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className={cn('hover:bg-accent cursor-pointer text-destructive')}
                  >
                    <LogOut className="size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Controlled Workspace Creation Dialog */}
      <WorkspaceDialog open={createWorkspaceOpen} onOpenChange={setCreateWorkspaceOpen} />
    </>
  );
}
