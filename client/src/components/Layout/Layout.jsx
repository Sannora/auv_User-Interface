import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Navbar />
        </>
    );
}

export default Layout;