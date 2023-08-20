import React from 'react';

import LeafletMap from './LeafletMap';
import LogWindow from './LogWindow';
import BodyWindow from './BodyWindow';

const Layout = ({children}) => {
    return(
        <>
        <div>
            <LeafletMap/>
            <BodyWindow/>
            <LogWindow/>
        </div>
        <main>{children}</main>
        </>
    )
}

export default Layout;
