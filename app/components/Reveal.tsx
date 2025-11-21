"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    duration?: number;
    yOffset?: number;
    className?: string;
}

export const Reveal = ({
    children,
    width = "fit-content",
    delay = 0,
    duration = 0.5,
    yOffset = 20,
    className = ""
}: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [ isVisible, setIsVisible ] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([ entry ]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ ref } className={ className } style={ { position: "relative", width } }>
            <div
                style={ {
                    transform: isVisible ? "translateY(0)" : `translateY(${yOffset}px)`,
                    opacity: isVisible ? 1 : 0,
                    transition: `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                    transitionDelay: `${delay}s`,
                } }
            >
                { children }
            </div>
        </div>
    );
};
