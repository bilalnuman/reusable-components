import React from "react";
import styles from "./Spinner.module.css";

interface SpinnerProps {
    size?: number;
    color?: string;
    className?: string;
    containerClass?: string;
    backDrop?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
    size = 24,
    color = '#3b82f6',
    className = '',
    containerClass = '',
    backDrop = false,
}) => {
    return (
        <div
            className={`${backDrop ? styles.backdrop : styles.fullscreen} ${containerClass}`}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div
                className={`${styles.spinner} ${className}`}
                style={{
                    width: size,
                    height: size,
                    borderTopColor: color,
                }}
            />
        </div>
    );
};

export default Spinner;
