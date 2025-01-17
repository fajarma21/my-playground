"use client";

import dynamic from "next/dynamic";

const HeaderLazy = dynamic(() => import("./View"));

export default HeaderLazy;
