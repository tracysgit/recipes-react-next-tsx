import MainMenu from "./main-menu"

export default function HeaderMain() {
  return (
    <header className="header-main bg-blue-800 text-white">
      <div className="max-w-[1100px] px-4 md:px-6 mx-auto">
        <MainMenu />
      </div>
    </header> 
  )
}
