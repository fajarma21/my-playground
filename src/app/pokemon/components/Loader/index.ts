"use client";

import dynamic from "next/dynamic";

const LoaderLazy = dynamic(() => import("./View"));

export default LoaderLazy;
