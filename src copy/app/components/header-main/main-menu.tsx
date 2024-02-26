import { TCategories } from "@/app/lib/definitions";
import MainMenuLink from "./main-menu-link";
import { getCategories } from "@/app/lib/localdata";
import { capFirstLetter } from "@/app/utils/utils";

export default function MainMenu() {
    const categories: TCategories = getCategories();

    return (
    <nav aria-label="Main Menu" className="mainnav flex flex-col items-center md:items-start">
      <input id="mainmenu-btn" type="checkbox" className="mainmenu-btn" />
      <label className="mainmenu-icon" htmlFor="mainmenu-btn" tabIndex={0}><span className="navicon"></span></label>
      <ul className="mainmenu flex flex-row flex-wrap justify-center md:justify-start my-0 md:my-3 -ml-3">
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