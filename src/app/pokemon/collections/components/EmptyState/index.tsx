"use client";

import dynamic from "next/dynamic";
const EmptyStateLazy = dynamic(() => import("./View"));

export default EmptyStateLazy;
