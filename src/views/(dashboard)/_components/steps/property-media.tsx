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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { PiFlagBannerFoldDuotone } from "react-icons/pi";
import { useWalletStore } from "@/store/wallet.store";

const PropertyMedia = ({
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
      <FormField
        control={control}
        name="banner"
        render={({ field }) => (
          <FormItem className="w-full">
            <Label
              htmlFor="banner"
              className={cn(
                "flex h-14 cursor-pointer items-center gap-2 rounded-[8px] border border-[#F2F4F7] bg-background px-5 py-2 text-sm",
                {
                  "border-red-500 focus-visible:ring-red-500": errors.banner,
                },
              )}
            >
              {field.value ? (
                <>
                  <img
                    src={URL.createObjectURL(field.value)} // Preview the selected banner
                    alt={field.value.name}
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  <span className="text-muted-foreground">
                    {field.value.name} - {Math.round(field.value.size / 1024)}{" "}
                    KB
                  </span>
                </>
              ) : (
                <>
                  <PiFlagBannerFoldDuotone className="size-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Select a banner</span>
                </>
              )}
            </Label>
            <FormControl>
              <Input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                id="banner"
                hidden
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.onChange(file);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="photos"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <FileUploader
                title="Drag 'n' drop images here or click to select"
                value={field.value}
                onValueChange={field.onChange}
                maxFiles={10}
                maxSize={100 * 1024 * 1024}
                {...register("photos")}
                className={errors.photos ? "border-red-500" : ""}
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

export default PropertyMedia;
