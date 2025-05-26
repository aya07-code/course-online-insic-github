import { faUsers } from '@fortawesome/free-solid-svg-icons';
export const sidebarItems = [
  {
    id: 1,
    href: "/dashboard-admin",
    iconClass: "text-20 icon-discovery",
    text: "Dashboard",
  },
  {
    id: 4,
    href: "/dshb-messages",
    iconClass: "text-20 icon-message",
    text: "Messages",
  },
  {
    id: 5,
    href: "/dshb-listing",
    iconClass: "text-20 icon-list",
    text: "Create Course",
  },
  {
    id: 6,
    href: "/dshb-students",
    iconClass: "text-18",
    icon: faUsers,
    text: "Students",
  },
  {
    id: 7,
    href: "/dshb-reviews",
    iconClass: "text-20 icon-comment",
    text: "Reviews",
  },
  {
    id: 8,
    href: "/dshb-settings",
    iconClass: "text-20 icon-setting",
    text: "Update Profile",
  },
  {
    id: 9,
    href: "/",
    iconClass: "text-20 icon-power",
    text: "Logout",
  },
];