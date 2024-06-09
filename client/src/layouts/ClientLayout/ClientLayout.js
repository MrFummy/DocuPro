import React from "react";

export function ClientLayout(props) {
    const { children } = props;

    return (
        <div>
            <h2>Esta cargando el ClientLayoutLayout</h2>

            {children}
        </div>
    );
} 