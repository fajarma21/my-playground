"use client";

import dynamic from "next/dynamic";

const CollectionsLazy = dynamic(() => import("./View"));

export default CollectionsLazy;
