import React from 'react'
import './Sidebar.css'
import {Link} from 'react-scroll'


const CustomerSidebar = ({setSideBarClicked}) => {

    return (
        <div className='customersidebarMainDiv'>
            <div className="customername">
                Welcome <span>{localStorage.getItem("CustomerName")}</span>
            </div>
            <div className="foodDiv">
                <div className="foodTittle">
                    CATEGORIES
                </div>
                <div className="categories">
                    <ul style={{listStyle:"none"}}>
                        <Link spy={true} to="biriyani" smooth={true} activeClass="activclass">
                            <li onClick={()=>setSideBarClicked(false)}>BIRIYANI</li>
                        </Link>

                        <Link spy={true} to="burger" smooth={true} activeClass="activclass">
                            <li onClick={()=>setSideBarClicked(false)}>BURGER</li>
                        </Link>
                        <Link spy={true} to="shawarma" smooth={true} activeClass="activclass">
                            <li onClick={()=>setSideBarClicked(false)}>SHAWARMA</li>
                        </Link>
                        <Link spy={true} to="noodles" smooth={true} activeClass="activclass">
                            <li onClick={()=>setSideBarClicked(false)}>NOODLES</li>
                        </Link>



                    </ul>
                    <div>We will add more categories soon</div>
                </div>
            </div>

        </div>
    )
}

export default CustomerSidebar