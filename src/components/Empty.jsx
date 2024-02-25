import { MdErrorOutline } from "react-icons/md";

function Empty({ source, height }) {
    return (
        <div
            className={`w-full pt-[100%] md:pt-0 flex-1 gap-2 flex h-11/12 items-center justify-center ${height}`}>
            <span> {`No ${source} were found`}</span>
            <MdErrorOutline />
        </div>
    );
}

export default Empty;
