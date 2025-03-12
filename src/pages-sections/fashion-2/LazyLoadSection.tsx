import { useEffect, useState } from "react";

export const LazyLoadSection = ({ children, id }: { children: React.ReactNode; id: string }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" } // Precarga 200px antes de entrar en viewport
        );

        const element = document.getElementById(id);
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [id]);

    return <div id={id}>{isVisible && children}</div>;
};