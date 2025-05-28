import { type ReactNode, type FC, useRef } from "react";
import List from "./List";
import { sidebarItems } from '@src/mockData';

import ListItem from "./ListItem";
import { NavLink } from "react-router-dom";
import type { SIDEBAR_ITEMS_TYPES } from "types";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";
interface SidebarProps extends React.HTMLAttributes<HTMLBaseElement> {
    children?: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children, ...props }) => {
    const closeSidebar = () => {
        document.body.classList.add("open-sidebar")
    }
    return <aside {...props} className="scrollbar-hidden bg-blue-500 xl:w-[250px] w-[220px] sticky overflow-y-auto h-[calc(100vh-60px)] z-10">
        <Button onClick={closeSidebar} variant="text" label="" icon={<IoMdClose fill="#fff" />} style={{
            position: "absolute",
            right: 0
        }} />
        <List>
            {sidebarItems.map((item: SIDEBAR_ITEMS_TYPES) => (
                <ListItem key={item.label} className="flex flex-col">
                    <NavLink to={item.href} className="px-4 py-2.5 mb-0.5 hover:text-white hover:font-semibold hover:bg-blue-400 transition-all duration-300">
                        <span>{item.label}</span>
                    </NavLink>
                </ListItem>
            ))}
        </List>
        {children}
    </aside>;
};

export default Sidebar;
