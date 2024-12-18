import React from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <img src="/MovieLogo.png" alt="Movie Logo" className="w-[4vw] transform scale-150 " />
    </Link>
  );
}

export default Logo;

//asChild allows the Link component to take over rendering while still applying the Button component's styles and behavior (like size)
