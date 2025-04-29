// import { unstable_ViewTransition as ViewTransition } from "react";

// import Image from "next/image";
// import Link from "next/link";

// import { PAGES } from "./page.constants";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        test
        {/* {PAGES.map(({ path, img }, index) => (
          <Link key={`link-${index}`} href={path} className={styles.link}>
            <ViewTransition name={`${path}-logo`}>
              <Image
                priority
                className={styles.logo}
                src={img}
                alt={path}
                width={212}
                height={78}
              />
            </ViewTransition>
          </Link>
        ))} */}
      </div>
    </div>
  );
}
