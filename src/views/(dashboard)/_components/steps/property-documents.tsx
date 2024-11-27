import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ArrowDown, Loader } from "lucide-react";
import { FileUploader } from "@/components/shared/file-uploader";
import { IPropsToPass } from "../../new-listing.view";

const PropertyDocuments = ({
  form: {
    control,
    register,
    formState: { errors, isSubmitting },
  },
  prev,
}: IPropsToPass) => {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={control}
        name="propertyDocuments"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                maxFiles={10}
                maxSize={100 * 1024 * 1024}
                className={errors.propertyDocuments ? "border-red-500" : ""}
                {...register("propertyDocuments")}
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
          disabled={isSubmitting}
          variant="ghost"
        >
          Back
        </Button>
        <Button
          type="submit"
          size={"lg"}
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader className="size-5 animate-spin" />
              <span>Please wait...</span>
            </>
          ) : (
            <>
              <span>Submit</span>
              <ArrowDown className="size-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PropertyDocuments;
