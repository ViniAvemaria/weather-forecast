"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

const RAIN_VARIANTS = {
    animate: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const RAIN_CHILD_VARIANTS = {
    normal: {
        opacity: 1,
    },
    animate: {
        opacity: [1, 0.2, 1],
        transition: {
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
        },
    },
};

const CloudRainIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 24, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useEffect(() => {
        controls.start("animate");
    }, [controls]);

    useImperativeHandle(ref, () => {
        isControlledRef.current = true;
        return {
            startAnimation: () => controls.start("animate"),
            stopAnimation: () => controls.start("normal"),
        };
    });

    const handleMouseEnter = useCallback(
        (e) => {
            if (isControlledRef.current) {
                onMouseEnter?.(e);
            } else {
                controls.start("animate");
            }
        },
        [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
        (e) => {
            if (isControlledRef.current) {
                onMouseLeave?.(e);
            } else {
                controls.start("normal");
            }
        },
        [controls, onMouseLeave],
    );

    return (
        <div {...props}>
            <svg
                className={cn(className)}
                fill="none"
                height={size}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width={size}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <motion.g animate={controls} initial="normal" variants={RAIN_VARIANTS}>
                    <motion.path d="M16 14v6" variants={RAIN_CHILD_VARIANTS} />
                    <motion.path d="M8 14v6" variants={RAIN_CHILD_VARIANTS} />
                    <motion.path d="M12 16v6" variants={RAIN_CHILD_VARIANTS} />
                </motion.g>
            </svg>
        </div>
    );
});

CloudRainIcon.displayName = "CloudRainIcon";

export { CloudRainIcon };
