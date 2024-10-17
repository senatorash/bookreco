import NavBar from "./NavBar";
import Footer from "./Footer";
import AppRoutes from "./AppRoutes";

const Layout = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <AppRoutes />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
