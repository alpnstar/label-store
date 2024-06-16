import React, { useContext, ReactNode } from 'react';
import { CarouselContext } from '../carousel-context';
import './Page.scss';

interface PageProps {
    children: ReactNode;
}

export const Page: React.FC<PageProps> = ({ children }) => {
    const context = useContext(CarouselContext);

    if (!context) {
        return <div>Error: CarouselContext not provided</div>;
    }

    const { width } = context;

    return (
        <div
            className="page__main-container"
            style={{
                minWidth: `${width}px`,
                maxWidth: `${width}px`,
            }}
        >
            {children}
        </div>
    );
};
