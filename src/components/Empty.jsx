import { MdErrorOutline } from "react-icons/md";

function Empty({ source, height }) {
    return (
        <div
            className={`w-full pt-[20%] md:pt-[40%] lg:pt-[10%] flex-1 gap-2 flex h-11/12 items-center justify-center ${height}`}>
            <span> {`No ${source} were found`}</span>
            <MdErrorOutline />
        </div>
    );
}

export default Empty;
