import dynamic from "next/dynamic";

const CatchedIconLazy = dynamic(() => import("./View"), { ssr: false });

export default CatchedIconLazy;
