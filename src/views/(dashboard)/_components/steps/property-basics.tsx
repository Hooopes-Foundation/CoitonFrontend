import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowDown, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { IPropsToPass } from "../../new-listing.view";
import { useState, useRef } from "react";
import { searchLocations } from "@/lib/geocode";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listingTypes, propertyTypes } from "@/static";
import { useWalletStore } from "@/store/wallet.store";

const PropertyBasics = ({
  form: {
    control,
    setValue,
    setError,
    register,
    formState: { errors, isSubmitting },
  },
  next,
  prev,
}: IPropsToPass) => {
  const isWalletConnected = useWalletStore((state) => state.isWalletConnected);
  const [suggestions, setSuggestions] = useState<
    { name: string; latitude: number; longitude: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // Ref to store the debounce timer
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Fetch suggestions when user stops typing
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;

    if (debounceTimer.current) {
      // Clear the existing debounce timer
      clearTimeout(debounceTimer.current);
    }

    // If the input is empty, clear suggestions and return early
    if (inputValue === "") {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    // Set a new debounce timer
    debounceTimer.current = setTimeout(async () => {
      if (inputValue.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchLocations(inputValue);
        setSuggestions(results);
      } catch (err) {
        setError("location", {
          message: err instanceof Error ? err.message : "An error occurred",
        });
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  // Handle selection of a location
  const handleSelectLocation = (location: {
    name: string;
    latitude: number;
    longitude: number;
  }) => {
    setValue("location", {
      name: location.name,
      latitude: String(location.latitude),
      longitude: String(location.longitude),
    }); // Update the form's location value
    setSuggestions([]); // Clear suggestions after selection
    setIsLoading(false); // Ensure loading state is cleared when selection is made
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <FormField
          control={control}
          name="propertyType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Select
                  {...register("propertyType")}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger
                    className={cn("text-base", {
                      "border-red-500 focus-visible:ring-red-500":
                        errors.propertyType,
                    })}
                  >
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="listingType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Select
                  {...register("listingType")}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger
                    className={cn("text-base", {
                      "border-red-500 focus-visible:ring-red-500":
                        errors.listingType,
                    })}
                  >
                    <SelectValue
                      className="capitalize"
                      placeholder="Listing Type"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {listingTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="capitalize"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="title"
        render={() => (
          <FormItem className="w-full">
            <FormControl>
              <Input
                placeholder="Villa in Rizal, Phillippines"
                type="text"
                className={cn("text-base", {
                  "border-red-500 focus-visible:ring-red-500": errors.title,
                })}
                {...register("title")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex w-full items-center gap-4">
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Search for a location"
                    value={field.value?.name || ""}
                    onChange={(e) =>
                      setValue("location", {
                        ...field.value,
                        name: e.target.value,
                      })
                    }
                    onKeyDown={handleKeyDown}
                    className={cn("text-base", {
                      "border-red-500 focus-visible:ring-red-500":
                        errors.location,
                    })}
                  />
                  {/* Suggestions */}
                  {suggestions.length > 0 && !isLoading && (
                    <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-[8px] bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {suggestions.map((suggestion) => (
                        <li
                          key={`${suggestion.latitude},${suggestion.longitude}`}
                          className="flex h-14 cursor-pointer items-center px-5 py-2 hover:bg-gray-100"
                          onClick={() => handleSelectLocation(suggestion)}
                        >
                          {suggestion.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-[8px] bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <p className="flex h-12 items-center gap-2 px-5 py-2">
                        <Loader className="size-4 animate-spin" /> Searching...
                      </p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="price"
          render={() => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="$999"
                  type="number"
                  className={cn("text-base", {
                    "border-red-500 focus-visible:ring-red-500": errors.price,
                  })}
                  {...register("price")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="description"
        render={() => (
          <FormItem className="w-full">
            <FormControl>
              <Textarea
                placeholder="Property Description"
                className={cn("h-[144px] resize-none text-base", {
                  "border-red-500 focus-visible:ring-red-500":
                    errors.description,
                })}
                {...register("description")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Location Input with Suggestions */}

      {/* Navigation Buttons */}
      <div className="mt-4 flex w-full items-center gap-4">
        <Button
          type="button"
          size={"lg"}
          className="max-w-[103px]"
          onClick={prev}
          disabled={!isWalletConnected || isSubmitting}
          variant="ghost"
        >
          Back
        </Button>
        <Button
          type="button"
          disabled={!isWalletConnected || isSubmitting}
          onClick={next}
          size={"lg"}
          className="flex-1"
        >
          <span>Next</span>
          <ArrowDown className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default PropertyBasics;
