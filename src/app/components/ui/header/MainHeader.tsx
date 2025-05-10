import MainMenu from "@/app/components/ui/header/MainMenu";
import ThemeChanger from "../theme-changer/ThemeChanger";

/**
 * This is the main header component.
 * @constructor
 */
export default function MainHeader() {
  return (
    <header className="header-main bg-blue-800 text-white">
      <div className="max-w-[1100px] flex justify-between items-start md:items-center px-4 md:px-6 py-2 mx-auto">
        <MainMenu />
        <ThemeChanger />
      </div>
    </header>
  )
}
