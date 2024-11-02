import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWriteData } from "@/hooks/starknet/useWriteData";
import { bigintReplacer, cn, generateRandomListings } from "@/lib/utils";
import { ChevronDown, Copy, CopyCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const WriteFunctions = ({ functions }: { functions: FunctionItem[] }) => {
  const [currentQuery, setCurrentQuery] = useState<{
    funcName: string;
    inputs: any[];
  } | null>(null);
  const [activeAccordion, setActiveAccordion] = useState("");
  const [inputValues, setInputValues] = useState<{ [key: string]: string[] }>(
    {},
  );
  const [queryResults, setQueryResults] = useState<{ [key: string]: any }>({});
  const [listingData, setListingData] = useState({
    listing: null as CREATE_LISTING | null,
    isGenerating: false as boolean,
    isCopied: false as boolean,
  });

  const { result, isLoading, error, execute } = useWriteData(
    currentQuery || { funcName: "", inputs: [] },
  );

  const toggleAccordion = (fn: string) =>
    setActiveAccordion(activeAccordion === fn ? "" : fn);

  const handleSubmit = (fn: FunctionItem) => {
    const inputs = inputValues[fn.name] || [];
    setCurrentQuery({ funcName: fn.name, inputs });
    setListingData({
      listing: null,
      isGenerating: false,
      isCopied: false,
    });
    execute();
  };

  const handleInputChange = (fnName: string, index: number, value: string) => {
    setInputValues((prev) => {
      const updatedInputs = [...(prev[fnName] || [])];
      updatedInputs[index] = value;
      return { ...prev, [fnName]: updatedInputs };
    });
  };

  useEffect(() => {
    if (result?.queryData && currentQuery) {
      setQueryResults((prev) => ({
        ...prev,
        [currentQuery.funcName]: result?.queryData,
      }));
    }
  }, [result?.queryData, currentQuery]);

  return functions.map((fn) => (
    <div key={fn.name} className="group flex flex-col">
      <div
        role="button"
        onClick={() => toggleAccordion(fn.name)}
        className="flex h-[69px] cursor-pointer items-center justify-between border-t border-border/30 px-6 py-4 hover:bg-secondary/50 group-first:border-t-0"
      >
        <span className="flex items-center gap-2">
          <span className="tracking-wide text-[#bf43ca]">{fn.name}</span>
          <span className="space-x-2 tracking-wide">
            ({" "}
            {fn.inputs.length > 0 && (
              <i className="space-x-2 text-destructive">
                {fn.inputs.map((input: { name: string }, index: number) => (
                  <span key={index}>
                    {input.name}
                    {index < fn.inputs.length - 1 && ", "}
                  </span>
                ))}
              </i>
            )}{" "}
            )
          </span>
        </span>

        <span
          className={cn("transition-transform duration-200", {
            "rotate-180": activeAccordion === fn.name,
          })}
        >
          <ChevronDown className="size-5" />
        </span>
      </div>

      {/* Accordion Content */}
      <div
        className={cn("h-0 overflow-hidden border-t-0 border-border/30", {
          "h-max border-t": activeAccordion === fn.name,
        })}
      >
        <div className="flex w-full flex-col gap-8 bg-background p-6">
          <div className="w-full max-w-[550px]">
            {fn.inputs.length > 0 ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(fn);
                }}
              >
                {fn.inputs.map(
                  (input: { name: string; type: string }, index: number) => (
                    <div key={index} className="mb-4 flex flex-col gap-3">
                      <Label className="flex flex-col">
                        <span className="text-lg">{input.name}</span>
                        <span className="text-sm leading-none text-muted-foreground">
                          {input.type}
                        </span>
                      </Label>
                      <Input
                        disabled={isLoading}
                        required
                        type="text"
                        className="rounded text-base tracking-wide"
                        value={inputValues[fn.name]?.[index] || ""}
                        onChange={(e) =>
                          handleInputChange(fn.name, index, e.target.value)
                        }
                        placeholder="(integer or hex, e.g.: 1 or 0x1)"
                      />
                    </div>
                  ),
                )}
                <div className="my-4 flex items-center gap-4">
                  <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    txt="Transacting..."
                    type="submit"
                    className="w-max rounded px-7 py-3"
                  >
                    Transact
                  </Button>
                  {fn.name === "create_listing" && (
                    <Button
                      disabled={isLoading || listingData.isGenerating}
                      isLoading={listingData.isGenerating}
                      type="button"
                      onClick={async () => {
                        setListingData((prev) => ({
                          ...prev,
                          isGenerating: true,
                        }));
                        const result = generateRandomListings();
                        setListingData((prev) => ({
                          ...prev,
                          listing: result,
                          isGenerating: false,
                          isCopied: false,
                        }));
                      }}
                      className="w-max rounded px-7 py-3"
                      variant={"black"}
                    >
                      Generate Listing
                    </Button>
                  )}

                  {listingData.listing && (
                    <Button
                      className="!size-11 rounded !p-0"
                      variant="outline"
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          JSON.stringify(
                            listingData.listing,
                            bigintReplacer,
                            2,
                          ),
                        );
                        toast.success("Copied to clipboard");
                        setListingData((prev) => ({
                          ...prev,
                          isCopied: true,
                        }));
                        setTimeout(() => {
                          setListingData((prev) => ({
                            ...prev,
                            isCopied: false,
                          }));
                        }, 2000); // Reset copied state after 2 seconds
                      }}
                    >
                      {listingData.isCopied ? (
                        <CopyCheck className="size-5" />
                      ) : (
                        <Copy className="size-5" />
                      )}
                    </Button>
                  )}
                </div>
              </form>
            ) : (
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                txt="Transacting..."
                onClick={() => handleSubmit(fn)}
                className="mt-4 w-max rounded px-7 py-3"
              >
                Transact
              </Button>
            )}
          </div>

          {listingData.listing && (
            <div className="min-w-[550px]">
              <pre className="w-full whitespace-pre-wrap rounded border border-orange-500 bg-orange-500/10 px-5 py-4 font-sans_italic text-orange-500">
                {JSON.stringify(listingData.listing, bigintReplacer, 2)}
              </pre>
            </div>
          )}

          <div className="min-w-[550px]">
            {activeAccordion === fn.name &&
              queryResults[fn.name] !== undefined && (
                <pre className="w-full rounded border border-blue-500 bg-blue-500/10 px-5 py-4 font-sans_italic text-blue-500">
                  {(() => {
                    const result = queryResults[fn.name];

                    if (
                      typeof result === "string" ||
                      typeof result === "number"
                    ) {
                      // Render string or number directly
                      return <span>{result}</span>;
                    }

                    if (Array.isArray(result)) {
                      // Render an empty array message or map over array items
                      return result.length === 0 ? (
                        <span>No results found.</span>
                      ) : (
                        result.map((item, index) => (
                          <div key={index} className="mb-4">
                            {typeof item === "object" ? (
                              // Map over object properties within the array
                              Object.entries(item).map(([key, value]) => (
                                <div key={key}>
                                  <strong>{key}:</strong>{" "}
                                  {JSON.stringify(value)}
                                </div>
                              ))
                            ) : (
                              <span>{JSON.stringify(item)}</span>
                            )}
                          </div>
                        ))
                      );
                    }

                    if (typeof result === "object" && result !== null) {
                      // Render single object properties
                      return Object.entries(result).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {JSON.stringify(value)}
                        </div>
                      ));
                    }

                    return null; // In case none of the conditions match
                  })()}
                </pre>
              )}
            {activeAccordion === fn.name && error && (
              <pre className="w-full rounded border border-red-500 bg-red-500/10 px-5 py-4 font-sans_italic text-red-500">
                {JSON.stringify(error, bigintReplacer, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
};

export default React.memo(WriteFunctions);
