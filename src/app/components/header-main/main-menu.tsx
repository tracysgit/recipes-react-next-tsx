import MainMenuLink from "./main-menu-link";
import { getCategories } from "@/app/lib/localdata";
import { capFirstLetter } from "@/app/utils/utils"

export default function MainMenu() {
    const categories = getCategories();

    return (
    <nav aria-label="Main Menu" className="mainmenu flex flex-col">
      {/* <input id="mainmenu-btn" type="checkbox" className="mainmenu-btn" />
      <label className="mainmenu-icon" htmlFor="mainmenu-btn" tabIndex={0}><span className="navicon"></span></label>  */}
      {/* <div>{JSON.stringify(categories, null, 2)}</div> */}
      <ul className="mainmenu__list flex flex-row flex-wrap justify-center md:justify-start my-3 -ml-3">
        <li className="mainmenu__item my-1"><MainMenuLink href="/">Home</MainMenuLink></li>
        {categories.map((category) => (
          <li className="mainmenu__item my-1" key={category}>
            <MainMenuLink href={`/${category}`}>{capFirstLetter(category)}</MainMenuLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}