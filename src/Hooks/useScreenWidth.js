import { useEffect, useState } from "react";

export function useScreenWidth() {
    const [width, setWidth] = useState();
    useEffect(
        function () {
            window.addEventListener("resize", (e) => {
                setWidth(e.target.innerWidth);
            });
        },
        [width]
    );

    return { width };
}
