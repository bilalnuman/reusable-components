import type { ReactNode, FC, LiHTMLAttributes } from "react";

interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
    children: ReactNode;
}

const ListItem: FC<ListItemProps> = ({ children, ...props }) => {
    return <li {...props}>{children}</li>;
};

export default ListItem;
