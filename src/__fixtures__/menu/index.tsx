import React, { memo } from "react"


export interface MenuProps {
    addClass?: string;
    values: {
        display: React.ReactNode,
        returnVal?: any;
    }[];
    giveValue: (value: any) => void;
    refer: React.MutableRefObject<any>;
}

function Menu({ addClass, values, giveValue, refer }: MenuProps) {
    return (
        <div ref={refer} className={`absolute ${addClass} text-gray-700 z-10 rounded py-1 bg-white shadow`}>
            {values.map((value, idx) => (
                <div
                    key={idx}
                    className="py-1 px-2 text-sm hover:bg-gray-200 cursor-pointer overflow-hidden"
                    onClick={() => giveValue(value.returnVal || value.display)}
                >
                    {value.display}
                </div>
            ))}
        </div>
    )
}

export default memo(Menu)
