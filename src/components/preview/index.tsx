import React from 'react';

interface PreviewProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  hashtag: string;
  number: string | number;
  title: string;
  simplePage: boolean;
  body?: string;
  quote?: string;
  author?: string;
  aspectRatio?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

const Preview: React.FC<PreviewProps> = ({
  previewRef,
  hashtag,
  number,
  title,
  simplePage,
  body,
  quote,
  author,
  aspectRatio = 'aspect-[5/5]',
  backgroundColor = 'bg-[#FFF4B8]',
  textColor = 'text-red-600',
  borderColor = 'border-red-600'
}) => {
  return (
    <div className="flex-1 flex justify-center items-start">
      <div
        ref={previewRef}
        className={`${backgroundColor} w-[480px] sm:w-[600px] ${aspectRatio} flex flex-col relative overflow-hidden`}
      >
        {/* Grid layout */}
        <div className="grid grid-cols-18 p-6 h-full  ">
          {/* Sidebar */}
          <div className={`col-span-1 col-start-1 border-2 ${borderColor} border-r-0`}>
            {/*Hashtag */}
            <div className={`text-m translate-y-32 rotate-90 scale-[-1] ${textColor} font-semibold tracking-wide whitespace-nowrap`}>
              #{hashtag}
            </div>
          </div>
          <div className={`col-span-17 col-start-2 grid grid-rows-[auto_auto_1fr_auto] gap-2  border-2 ${borderColor}`}>
            {/* Number */}
            <div className={`font-bebas-neue pt-2 pl-2 border-b-2 ${borderColor} text-9xl font-extrabold ${textColor} leading-none`}>
              {number}
            </div>

            {/* Title */}
            <div className={`font-bebas-neue p-2 ${textColor} text-7xl leading-[1] font-bold uppercase whitespace-pre-line`}>
              {title}
            </div>
            {simplePage && (
              <>
                {/* Body */}
                <p className={`border-t-2 ${borderColor} p-2 text-sm leading-relaxed whitespace-pre-line`}>
                  {body}
                </p>

                {/* Quote */}
                <div className={`mt-auto p-2 border-t-2 ${borderColor} text-sm italic`}>
                  "{quote}"
                  <br />
                  <span className="not-italic font-medium text-base">
                    {author}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;