import React, { ReactNode } from "react";

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

export type TGameEvent = TCollisionEvent;

export type TCollisionEvent = {
    type: "collision";
    tick: number;
    collidedWith: TTile;
}

export type TTile = {
    type: "dirt" | "stone" | "sky" | "diamond";
    x: number;
    y: number;
    children?: ReactNode;
    bg: string;
}