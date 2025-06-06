import { useState, useRef, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";

// --- Helper to download png -----------------------------------------------
async function downloadPNG(
  node: HTMLElement | null,
  fileName: string = "art-prompt.png"
): Promise<void> {
  if (!node) return;
  toPng(node, { cacheBust: true })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.log(err);
    });
}

// ---------------------------------------------------------------------------
export default function ArtPromptGenerator() {
  const [number, setNumber] = useState("001");
  const [hashtag, setHashtag] = useState("onephotoaday001");
  const [title, setTitle] = useState(
    "GO TO AN ART GALLERY OR A MUSEUM TODAY AND CHOOSE ONE WORK TO TAKE HOME WITH YOU."
  );
  const [simplePage, setSimplePage] = useState(false);
  const [body, setBody] = useState(
    `One of the best ways you can practise paying attention to the things around you is to look at art. Think about how absurdly fast we move through a museum or an art exhibit, glancing at each artwork for just a few seconds, considering each work has taken days, weeks, months, or even years to create.\n\nA good way to teach yourself to give art the attention it deserves is to play a game with yourself when you enter a gallery or a museum. Pretend that you have an unlimited budget and that you can take just one work of art home with you. Which one would you choose? Think about it very carefully. Take a picture of your final choice and use it as your screensaver.`
  );
  const [quote, setQuote] = useState(
    "Art enables us to find ourselves and lose ourselves at the same time."
  );
  const [author, setAuthor] = useState("Thomas Merton");

  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row gap-8 p-6">
      {/* ---------------------------------------------------------------- */}
      {/* Controls */}
      <Card className="w-full md:max-w-sm">
        <CardContent className="flex flex-col gap-4 p-6">
          <h2 className="text-xl font-semibold">Controls</h2>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Number</label>
            <Input
              value={number}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNumber(e.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Hashtag (without #)</label>
            <Input
              value={hashtag}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHashtag(e.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Title (use \n for line breaks)
            </label>
            <Textarea
              rows={4}
              value={title}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setTitle(e.target.value)
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-medium">Enable full page</label>
            <Checkbox
              checked={simplePage}
              onCheckedChange={(checked) => {
                const booleanValue = checked === true;
                setSimplePage(booleanValue);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Body</label>
            <Textarea
              rows={6}
              value={body}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setBody(e.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Quote</label>
            <Input
              value={quote}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuote(e.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Author</label>
            <Input
              value={author}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAuthor(e.target.value)
              }
            />
          </div>

          <Button
            className="mt-4 gap-2"
            onClick={() => downloadPNG(previewRef.current)}
          >
            <Download size={16} /> Download PNG
          </Button>
        </CardContent>
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Preview */}
      <div className="flex-1 flex justify-center items-start">
        <div
          ref={previewRef}
          className="bg-[#FFF4B8] w-[480px] sm:w-[600px] aspect-5/5 flex flex-col relative overflow-hidden"
        >
          {/* Grid layout */}
          <div className="grid grid-cols-18 p-6 h-full  ">
            <div className="col-span-1 col-start-1 border-2 border-red-600 border-r-0">
              {/* Sidebar hashtag */}
              <div className="absolute -left-8 top-30 -translate-y-1/2 -rotate-90 text-red-600 font-semibold tracking-wide whitespace-nowrap">
                #{hashtag}
              </div>
            </div>
            <div className="col-span-17 col-start-2 grid grid-rows-[auto_auto_1fr_auto] gap-2  border-2 border-red-600">
              {/* Number */}
              <div className="font-bebas-neue pt-2 pl-2 border-b-2 border-red-600 text-9xl font-extrabold text-red-600 leading-none">
                {number}
              </div>

              {/* Title */}
              <div className="font-bebas-neue p-2 text-red-600 text-7xl leading-[1] font-bold uppercase whitespace-pre-line">
                {title}
              </div>
              {simplePage && (
                <>
                  {/* Body */}
                  <p className="border-t-2 border-red-600 p-2 text-sm leading-relaxed whitespace-pre-line">
                    {body}
                  </p>

                  {/* Quote */}
                  <div className="mt-auto p-2 border-t-2 border-t border-red-600 text-sm italic">
                    “{quote}”
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
    </div>
  );
}
