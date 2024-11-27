import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowDown, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { IPropsToPass } from "../../new-listing.view";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { TagsInput } from "@/components/ui/tag-input";
import { useWalletStore } from "@/store/wallet.store";

const PropertyFeatures = ({
  form: {
    control,
    register,
    formState: { errors, isSubmitting },
  },
  next,
  prev,
}: IPropsToPass) => {
  const isWalletConnected = useWalletStore((state) => state.isWalletConnected);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <FormField
          control={control}
          name="bedrooms"
          render={() => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Bedrooms"
                  type="number"
                  className={cn("text-base", {
                    "border-red-500 focus-visible:ring-red-500":
                      errors.bedrooms,
                  })}
                  {...register("bedrooms")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="bathrooms"
          render={() => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Bathrooms"
                  type="number"
                  className={cn("text-base", {
                    "border-red-500 focus-visible:ring-red-500":
                      errors.bathrooms,
                  })}
                  {...register("bathrooms")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex w-full items-center gap-4">
        <FormField
          control={control}
          name="sizeSqft"
          render={() => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Size sqft."
                  type="number"
                  className={cn("text-base", {
                    "border-red-500 focus-visible:ring-red-500":
                      errors.sizeSqft,
                  })}
                  {...register("sizeSqft")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="landArea"
          render={() => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Land Area"
                  type="number"
                  className={cn("text-base", {
                    "border-red-500 focus-visible:ring-red-500":
                      errors.landArea,
                  })}
                  {...register("landArea")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex w-full items-center gap-4">
        <FormField
          control={control}
          name="parkingSpaces"
          render={() => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Parking Spaces"
                  type="number"
                  className={cn("text-base", {
                    "border-red-500 focus-visible:ring-red-500":
                      errors.parkingSpaces,
                  })}
                  {...register("parkingSpaces")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="yearBuilt"
          render={({ field }) => (
            <FormItem className="w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <div
                      className={cn(
                        "flex h-14 w-full items-center rounded-[8px] border border-[#F2F4F7] bg-background px-5 py-2 text-left text-base",
                        {
                          "border-red-500": errors.yearBuilt,
                        },
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className="text-muted-foreground">
                          Pick a date
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </div>
                    {/* <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                    </Button> */}
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="amenities"
        render={({ field }) => (
          <FormItem className="w-full">
            <TagsInput
              className="w-full"
              {...register("amenities")}
              value={field.value!}
              onValueChange={field.onChange}
              placeholder="Amenities"
            />
            <FormMessage />
            <FormDescription>
              Input your property amenity and press enter
            </FormDescription>
          </FormItem>
        )}
      />

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
          disabled={!isWalletConnected || isSubmitting}
          type="button"
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

export default PropertyFeatures;
