import type { ReactNode, FC } from "react";

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
    children: ReactNode;
}

const List: FC<ListProps> = ({ children, ...props }) => {
    return <ul {...props}>{children}</ul>;
};

export default List;
