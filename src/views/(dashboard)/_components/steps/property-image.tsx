import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ArrowDown } from "lucide-react";
import { FileUploader } from "@/components/shared/file-uploader";
import { IPropsToPass } from "../../new-listing.view";

const PropertyImages = ({
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
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                maxFiles={10}
                maxSize={100 * 1024 * 1024}
                {...register("images")}
                className={errors.images ? "border-red-500" : ""}
                accept={{
                  "image/png": [".png"],
                  "image/jpeg": [".jpg", ".jpeg"],
                }}
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

export default PropertyImages;
