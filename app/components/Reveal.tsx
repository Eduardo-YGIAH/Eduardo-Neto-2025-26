"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    duration?: number;
    yOffset?: number;
    className?: string;
}

const FALLBACK_TIMEOUT_MS = 3000;
// Check once at module level for environments without IntersectionObserver
const hasIntersectionObserver = typeof IntersectionObserver !== "undefined";

// Use useSyncExternalStore to safely detect client-side hydration
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

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
    const observerRef = useRef<IntersectionObserver | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const checkedViewportRef = useRef(false);

    // Safely detect if we're on the client (after hydration)
    const isClient = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

    useEffect(() => {
        if (!isClient) return;

        const element = ref.current;
        if (!element) return;

        // Check viewport once on mount
        if (!checkedViewportRef.current) {
            checkedViewportRef.current = true;
            const rect = element.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

            if (isInViewport || !hasIntersectionObserver) {
                // Already visible or no observer - show immediately (async to satisfy lint)
                queueMicrotask(() => setIsVisible(true));
                return;
            }
        }

        // Skip if already visible
        if (isVisible) return;

        // If no IntersectionObserver, show content
        if (!hasIntersectionObserver) {
            queueMicrotask(() => setIsVisible(true));
            return;
        }

        timeoutRef.current = setTimeout(() => setIsVisible(true), FALLBACK_TIMEOUT_MS);

        observerRef.current = new IntersectionObserver(
            ([ entry ]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    observerRef.current?.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        observerRef.current.observe(element);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            observerRef.current?.disconnect();
        };
    }, [ isClient, isVisible ]);

    // Only hide content after client hydration - SSR output remains visible
    const shouldHide = isClient && !isVisible;

    return (
        <div ref={ ref } className={ className } style={ { position: "relative", width } }>
            <div
                style={ {
                    transform: shouldHide ? `translateY(${yOffset}px)` : "translateY(0)",
                    opacity: shouldHide ? 0 : 1,
                    transition: isClient
                        ? `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`
                        : "none",
                } }
            >
                { children }
            </div>
        </div>
    );
};
