import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Seo from '@components/Seo';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;