"use client";

import dynamic from "next/dynamic";

const ClientVideoConverterLazy = dynamic(() => import("./View"));

export default ClientVideoConverterLazy;
