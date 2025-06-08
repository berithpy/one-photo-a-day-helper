import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Card, CardContent, CardFooter, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import Preview from "@/src/components/preview";

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

// --- Theme configurations ------------------------------------------------
const themes = {
  classicRed: {
    backgroundColor: "bg-[#FFF9AF]",
    textColor: "text-[#EB3238]",
    borderColor: "border-[#EB3238]"
  },
  plum: {
    backgroundColor: "bg-[#8B0052]",
    textColor: "text-[#FDFFFE]",
    borderColor: "border-[#FDFFFE]"
  },
  seafoam: {
    backgroundColor: "bg-[#D2EBDC]",
    textColor: "text-[#1D4A56]",
    borderColor: "border-[#1D4A56]"
  },
  blueish: {
    backgroundColor: "bg-[#C5CFD9]",
    textColor: "text-[#2F3192]",
    borderColor: "border-[#2F3192]"
  },
  reddy: {
    backgroundColor: "bg-[#FEE3DA]",
    textColor: "text-[#CD2837]",
    borderColor: "border-[#CD2837]"
  },
  plumGrey: {
    backgroundColor: "bg-[#C6D0D9]",
    textColor: "text-[#8C235C]",
    borderColor: "border-[#8C235C]"
  }
};

// ---------------------------------------------------------------------------
export default function ArtPromptGenerator() {
  const [number, setNumber] = useState("001");
  const [hashtag, setHashtag] = useState("onephotoaday001");
  const [title, setTitle] = useState(
    "GO TO AN ART GALLERY OR A MUSEUM TODAY AND CHOOSE ONE WORK TO TAKE HOME WITH YOU."
  );
  const [simplePage, setSimplePage] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>("classicRed");
  const [aspectRatio, setAspectRatio] = useState("aspect-[4/5]");
  const [body, setBody] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  );
  const [quote, setQuote] = useState(
    "Lorem ipsum when the lorem and the ipsum."
  );
  const [author, setAuthor] = useState("Lorem Ipsum");

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //change hashtag if number changes
    setHashtag(`onephotoaday${number.padStart(3, "0")}`);
  }, [number]);

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row gap-8 p-6">
      {/* Controls */}
      <Card className="w-full md:max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-6 pt-0">


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

          {/* Theming */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Theme!
            </label>
            <Select value={selectedTheme} onValueChange={(value: keyof typeof themes) => setSelectedTheme(value)}>
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(themes).map((theme) => (
                  <SelectItem key={theme} value={theme as keyof typeof themes}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </SelectItem>
                ))
                }
              </SelectContent>
            </Select>
          </div>

          {/* Aspect Ratio */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Aspect Ratio
            </label>
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Aspect Ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aspect-[4/5]">4:5 (Portrait)</SelectItem>
                <SelectItem value="aspect-square">1:1 (Square)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="hidden">

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
          </div>


        </CardContent>
        <CardFooter className="mt-auto w-full flex flex-col gap-2">
          <p>🛈 This page was built to make it easier to post photo challenges from Joost Joossen's book <a className="text-blue-600 text-decoration-line" href="https://en.lusterpublishing.com/products/one-photo-a-day-keeps-the-doctor-away" target="_blank">One Photo a Day Keeps the Doctor Away</a>
          </p>
          <Button
            className="w-full"
            onClick={() => downloadPNG(previewRef.current)}
          >
            <Download size={16} /> Download PNG
          </Button>
        </CardFooter>
      </Card>

      {/* ---------------------------------------------------------------- */}      {/* Preview */}
      <Preview
        previewRef={previewRef}
        number={number}
        hashtag={hashtag}
        title={title}
        simplePage={simplePage}
        body={body}
        quote={quote}
        author={author}
        aspectRatio={aspectRatio}
        backgroundColor={themes[selectedTheme].backgroundColor}
        textColor={themes[selectedTheme].textColor}
        borderColor={themes[selectedTheme].borderColor}
      />
    </div>
  );
}
