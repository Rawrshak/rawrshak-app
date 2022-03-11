import { Link } from "react-router-dom"
import Logo from "../assets/icons/Logo"
import ActiveLink from "./router/ActiveLink"

function MenuLink({
    menuName,
    link = ''
}:{
    menuName:string,
    link?:string
}) {
  if (menuName === 'Logo') {
    return(
      <div className="flex mr-12 mt-3">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    )
  } else {
    return(
      <div className="mx-4 mt-3 flex flex-col justify-center text-lg">
        <ActiveLink to={'/'.concat(link)} exact>
          {menuName}
        </ActiveLink>
      </div>
    )
  }
}

export default MenuLink