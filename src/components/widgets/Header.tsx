import { FaBars } from "react-icons/fa"
import Button from "./Button"

const Header = () => {
    const openSidebar = () => {
        document.body.classList.remove("open-sidebar")
    }
    return (
        <header className="sticky top-0 z-[1000] min-h-[60px] bg-white border-b border-gray-300 flex items-center px-4">
            <Button onClick={openSidebar} variant="text" label="" icon={<FaBars fill="#000" />}/>
        </header>
    )
}

export default Header