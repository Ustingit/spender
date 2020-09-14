import React from "react";

export const ColoredLine = ({ color, height = 0.2, width = 200 }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: height,
            width: width
        }}
    />
);
