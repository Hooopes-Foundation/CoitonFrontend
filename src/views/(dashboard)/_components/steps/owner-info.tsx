import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { IPropsToPass } from "../../new-listing.view";

const OwnerInfo = ({
  form: {
    control,
    register,
    formState: { errors },
  },
  next,
}: IPropsToPass) => {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={control}
        name="email"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Email"
                type="email"
                className={cn("text-base", {
                  "border-red-500 focus-visible:ring-red-500": errors.email,
                })}
                {...register("email")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Phone"
                type="number"
                className={cn("text-base", {
                  "border-red-500 focus-visible:ring-red-500": errors.phone,
                })}
                {...register("phone")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="social"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Socials"
                type="text"
                className={cn("text-base", {
                  "border-red-500 focus-visible:ring-red-500": errors.social,
                })}
                {...register("social")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="occupation"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Occupation"
                className={cn("text-base", {
                  "border-red-500 focus-visible:ring-red-500":
                    errors.occupation,
                })}
                type="text"
                {...register("occupation")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-4 flex w-full items-center">
        <Button type="button" size={"lg"} className="w-full" onClick={next}>
          <span>Next</span>
          <ArrowDown className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default OwnerInfo;
