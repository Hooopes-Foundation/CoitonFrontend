import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { IPropsToPass } from "../../new-listing.view";

const PropertyDetails = ({
  form: {
    control,
    register,
    formState: { errors },
  },
  next,
  prev,
}: IPropsToPass) => {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={control}
        name="location"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Location"
                type="text"
                className={cn("text-base", {
                  "border-red-500 focus-visible:ring-red-500": errors.location,
                })}
                {...register("location")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="state"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="State"
                type="text"
                className={cn("text-base", {
                  "border-red-500 focus-visible:ring-red-500": errors.state,
                })}
                {...register("state")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="postalCode"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Postal Code"
                type="number"
                className={cn("text-base", {
                  "border-red-500 focus-visible:ring-red-500":
                    errors.postalCode,
                })}
                {...register("postalCode")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex w-full items-center gap-4">
        <FormField
          control={control}
          name="price"
          render={() => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Listing Price"
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
      </div>

      <div className="flex w-full items-center gap-4">
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
        <FormField
          control={control}
          name="parkingSpot"
          render={() => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Parking Spots"
                  type="number"
                  className={cn("text-base", {
                    "border-red-500 focus-visible:ring-red-500":
                      errors.parkingSpot,
                  })}
                  {...register("parkingSpot")}
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
          name="constructionSqft"
          render={() => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Construction sqft."
                  type="number"
                  className={cn("text-base", {
                    "border-red-500 focus-visible:ring-red-500":
                      errors.constructionSqft,
                  })}
                  {...register("constructionSqft")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="landSqft"
          render={() => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Land sqft."
                  type="number"
                  className={cn("text-base", {
                    "border-red-500 focus-visible:ring-red-500":
                      errors.landSqft,
                  })}
                  {...register("landSqft")}
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
                placeholder="Property Details"
                className={cn("h-[144px] resize-none text-base", {
                  "border-red-500 focus-visible:ring-red-500": errors.landSqft,
                })}
                {...register("description")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-4 flex w-full items-center gap-4">
        <Button
          type="button"
          size={"lg"}
          className="max-w-[103px]"
          onClick={prev}
          variant="ghost"
        >
          Back
        </Button>
        <Button type="button" onClick={next} size={"lg"} className="flex-1">
          <span>Next</span>
          <ArrowDown className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default PropertyDetails;
