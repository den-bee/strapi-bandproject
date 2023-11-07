import { ReactElement } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children } : {children: ReactElement}) => {
    return (
      <div>
        <Header></Header>
        {children}
        <Footer></Footer>
      </div>
    );
  }
  
  export default Layout;