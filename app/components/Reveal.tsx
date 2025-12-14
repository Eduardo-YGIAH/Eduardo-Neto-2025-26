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

const FALLBACK_TIMEOUT_MS = 3000;

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
    const [ hasMounted, setHasMounted ] = useState(false);

    useEffect(() => {
        // Check if element is already in viewport to avoid flicker for above-the-fold content
        const element = ref.current;
        if (element) {
            const rect = element.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInViewport) {
                // Already visible - skip the hide/show cycle
                setIsVisible(true);
                setHasMounted(true);
                return;
            }
        }

        setHasMounted(true);

        // Fallback: show content if IntersectionObserver is unavailable or never fires
        if (typeof IntersectionObserver === "undefined") {
            setIsVisible(true);
            return;
        }

        const timeout = setTimeout(() => setIsVisible(true), FALLBACK_TIMEOUT_MS);

        const observer = new IntersectionObserver(
            ([ entry ]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    clearTimeout(timeout);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        };
    }, []);

    // Only hide content after client has mounted - SSR output remains visible
    const shouldHide = hasMounted && !isVisible;

    return (
        <div ref={ ref } className={ className } style={ { position: "relative", width } }>
            <div
                style={ {
                    transform: shouldHide ? `translateY(${yOffset}px)` : "translateY(0)",
                    opacity: shouldHide ? 0 : 1,
                    transition: hasMounted
                        ? `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`
                        : "none",
                } }
            >
                { children }
            </div>
        </div>
    );
};
