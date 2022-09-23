import React from "react";

export type TFramePixel = {
    color: string;
    content?: string | React.ReactNode;
    x: number;
    y: number;
}

export type TTreasure = {
    name: string;
    component: React.ReactNode;
    value: number;
}

export type TPlayer = {
    name: string;
    color: string;
    x: number;
    y: number;
}

export type TFrame = {
}