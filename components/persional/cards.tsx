import { CometCard } from "@/components/ui/comet-card";
import { Button } from "../ui/button";
import { MouseEventHandler } from "react";
import { ArrowRightSquareIcon } from "lucide-react";

type ToolCardProps = {
  title: string,
  onclick: MouseEventHandler,
  image: string,
}

export function ToolCard(
  {title,onclick,image  }:ToolCardProps
) {



  return (
    <CometCard className="w-auto">
      <button
        type="button"
        onClick={onclick}
        className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:my-20 md:p-4"
        aria-label="View invite F7RA"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}
      >
        <div className="mx-2 flex-1">
          <div className="relative mt-2 aspect-[3/4] w-full">
            <img
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
              alt="Invite background"
              src={image}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                opacity: 1,
              }}
            />
          </div>
        </div>
        <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
          <div className="text-xs">{title}</div>
          <div className="text-xs text-gray-300 opacity-50"><ArrowRightSquareIcon /></div>
        </div>
      </button>
    </CometCard>
  );
}
