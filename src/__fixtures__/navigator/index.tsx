import React, { memo, useRef } from "react"
import { ArrowDropDown } from "@material-ui/icons"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Button from "@material-ui/core/Button"
import Menu from "../menu"
import Logo from "../../components/logo"
import { NavLink } from "react-router-dom"
import { routes, authRoute } from "../layout/routeConfig"
import "./style.css"
import { localState } from ".."
import auth from "../auth"


function Navigator() {

    // ref
    const menuRef = useRef<any>()

    const { isSignedIn } = localState()

    function toggleMenu(type: "open" | "close") {
        (menuRef.current as HTMLElement).classList[type === "open" ? "remove" : "add"]("hidden")
    }

    return (
        <div className="flex flex-no-wrap items-center py-1 bg-white pr-4 pl-10 fixed top-0 left-0 w-full z-20 shadow-xs justify-between">
            <a href="/">
                <Logo />
            </a>
            <div className="flex items-center relative">
                <div className="mr-5 sm:hidden">
                    {Object.values(routes).map((nav, idx) => {
                        return (
                            <NavLink
                                exact={true}
                                to={nav.path}
                                key={idx}
                                className={`text-gray-700 inline cursor-pointer text-sm font-medium leading-5 float-left px-2 py-2 hover:text-gray-600 transition-colors duration-200`}
                                activeClassName="text_blue_700"
                            >
                                {nav.name}
                            </NavLink>
                        )
                    })}
                </div>
                {isSignedIn ? (
                    <div className="relative">
                        <ClickAwayListener onClickAway={() => toggleMenu("close")}>
                            <div className="flex items-center cursor-pointer" onClick={() => toggleMenu("open")}>
                                <div className="border-2 border-solid rounded-full border-gray-200 flex-shrink-0 overflow-hidden w-8 h-8 text-center mr-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/b/b0/Avatar-Teaser-Poster.jpg/220px-Avatar-Teaser-Poster.jpg" alt="Phuc nguyen" />
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <span className="mr-2 text-sm leading-5">Nguyen Van Phuc</span>
                                    <ArrowDropDown fontSize="small" />
                                </div>
                            </div>
                        </ClickAwayListener>
                        <Menu
                            addClass="hidden w-full top-full"
                            values={["Sign out", "My profile"]}
                            giveValue={console.log}
                            refer={menuRef}
                        />
                    </div>
                ) : (
                        <NavLink
                            to={authRoute.path}
                            exact={true}
                        >
                            <Button
                                color="primary"
                                size="small"
                                variant="contained"
                                disableElevation={true}
                            >
                                Login
                            </Button>
                        </NavLink>

                    )}

            </div>
        </div>
    )
}

export default memo(Navigator)
