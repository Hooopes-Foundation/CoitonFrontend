"use client";

import * as React from "react";
import { X, UploadIcon } from "lucide-react";
import Dropzone, {
  type DropzoneProps,
  type FileRejection,
} from "react-dropzone";
import { toast } from "sonner";

import { cn, formatBytes, truncateAddr } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useControllableState } from "@/hooks/upload/useControllableState";

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value?: File[];

  /**
   * Function to be called when the value changes.
   * @type React.Dispatch<React.SetStateAction<File[]>>
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;

  /**
   * Function to be called when files are uploaded.
   * @type (files: File[]) => Promise<void>
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  onUpload?: (files: File[]) => Promise<void>;

  /**
   * Progress of the uploaded files.
   * @type Record<string, number> | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps["accept"];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps["maxSize"];

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFiles={5}
   */
  maxFiles?: DropzoneProps["maxFiles"];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;
}

export function FileUploader(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = { "application/pdf": [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
  } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
        toast.error("Cannot upload more than 1 file at a time");
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
        toast.error(`Cannot upload more than ${maxFiles} files`);
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;

      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(`File ${file.name} was rejected`);
        });
      }

      if (
        onUpload &&
        updatedFiles.length > 0 &&
        updatedFiles.length <= maxFiles
      ) {
        const target =
          updatedFiles.length > 0 ? `${updatedFiles.length} files` : `file`;

        toast.promise(onUpload(updatedFiles), {
          loading: `Uploading ${target}...`,
          success: () => {
            setFiles([]);
            return `${target} uploaded`;
          },
          error: `Failed to upload ${target}`,
        });
      }
    },

    [files, maxFiles, multiple, onUpload, setFiles],
  );

  function onRemove(index: number) {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);
  }

  // Revoke preview url when component unmounts
  React.useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file: any) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDisabled = disabled || (files?.length ?? 0) >= maxFiles;

  return (
    <div className="relative flex flex-col gap-4 overflow-hidden">
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={maxFiles > 1 || multiple}
        disabled={isDisabled}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              "flex items-center justify-center rounded-[6px] border border-dashed bg-[#FAFFFF] p-10 text-center",
              "ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0",
              isDragActive && "border-muted-foreground/50",
              isDisabled && "pointer-events-none opacity-60",
              className,
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="flex size-16 items-center justify-center rounded-full border border-dashed">
                  <UploadIcon
                    className="size-7 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <p className="font-sans_medium text-base text-primary">
                  Drop the files here
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="flex flex-col">
                  <p className="font-sans_medium text-base text-primary">
                    Drag {`'n'`} drop files here, or click to <br /> select pdf
                    files
                  </p>
                  <p className="mb-4 mt-2 font-sans_regular text-xs text-muted-foreground">
                    {maxFiles > 1
                      ? ` ${maxFiles === Infinity ? "multiple" : maxFiles}
                      files (up to ${formatBytes(maxSize)} each)`
                      : ` a file with ${formatBytes(maxSize)}`}
                  </p>
                  <Button
                    className="mx-auto w-max px-6"
                    size={"sm"}
                    variant={"outline"}
                    type="button"
                  >
                    Browse Files
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {files?.length ? (
        <ScrollArea className="h-fit w-full">
          <div className="max-h-56 space-y-1 sm:space-y-2">
            {files?.map((file: any, index: number) => (
              <FileCard
                key={index}
                file={file}
                onRemove={() => onRemove(index)}
                progress={progresses?.[file.name]}
              />
            ))}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
}

interface FileCardProps {
  file: File;
  onRemove: () => void;
  progress?: number;
}

function FileCard({ file, onRemove }: FileCardProps) {
  // Helper function to get icon based on file type
  const getFileIcon = (file: File) => {
    const fileType = file.type;
    if (fileType.startsWith("image/png")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          id="images"
        >
          <g display="none">
            <rect
              width="48"
              height="48"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
          </g>
          <g transform="translate(-1097 -1410.362)">
            <path
              fill="#056F67"
              d="m 1123,1412.3622 c -0.554,0 -1,0.446 -1,1 l 0,1 c 0,0.554 0.446,1 1,1 l 10.0039,0 0.016,6.4844 c 0,0.8253 0.6708,1.4938 1.4961,1.4961 l 6.4844,0.017 0,28.502 c 0,0.8569 -0.6431,1.5 -1.5,1.5 l -23,0 c -0.857,0 -1.5,-0.6431 -1.5,-1.5 l 0,-1.5 c 0,-0.554 -0.446,-1 -1,-1 l -1,0 c -0.554,0 -1,0.446 -1,1 l 0,1.5 c 0,2.4671 2.0329,4.5 4.5,4.5 l 23,0 c 2.467,0 4.5,-2.0329 4.5,-4.5 l 0,-30.4863 c -10e-5,-0.3978 -0.1582,-0.7793 -0.4395,-1.0606 l -7.5137,-7.5136 c -0.2812,-0.2814 -0.6627,-0.4394 -1.0605,-0.4395 z m -11,21 c 0,0.554 0.446,1 1,1 l 1,0 c 0.554,0 1,-0.446 1,-1 l 0,-10 c 0,-0.554 -0.446,-1 -1,-1 l -1,0 c -0.554,0 -1,0.446 -1,1 z"
              color="#000"
              fontFamily="sans-serif"
              fontWeight="400"
              overflow="visible"
            ></path>
            <path
              fill="#056F67"
              d="m 1116.5,408 c -2.467,0 -4.5,2.0329 -4.5,4.5 l 0,2.5 c 0,0.554 0.446,1 1,1 l 1,0 c 0.554,0 1,-0.446 1,-1 l 0,-2.5 c 0,-0.8569 0.6431,-1.5 1.5,-1.5 l 2.5,0 c 0.554,0 1,-0.446 1,-1 l 0,-1 c 0,-0.554 -0.446,-1 -1,-1 l -2.5,0 z m -15.5,24 c -1.108,0 -2,0.892 -2,2 l 0,7 c 0,1.108 0.892,2 2,2 l 25,0 c 1.108,0 2,-0.892 2,-2 l 0,-7 c 0,-1.108 -0.892,-2 -2,-2 l -25,0 z m 18.0527,2.58789 c 0.4482,0 0.8782,0.10469 1.336,0.30469 0.1145,-0.21 0.2197,-0.29492 0.4297,-0.29492 0.2961,0 0.4296,0.12429 0.4296,0.52539 l 0.01,1.21093 c 0,0.401 -0.095,0.54493 -0.4863,0.54493 -0.2865,0 -0.4003,-0.14346 -0.4863,-0.43946 -0.1528,-0.5443 -0.4297,-0.83007 -1.1172,-0.83007 -0.9453,0 -1.4805,0.64932 -1.4805,1.89062 0,1.2413 0.5724,1.91992 1.5273,1.91992 0.2387,0 0.5354,-0.0591 0.8887,-0.16406 l 0,-0.72461 -0.5254,0 c -0.3915,0 -0.582,-0.12413 -0.582,-0.51563 0,-0.39149 0.1905,-0.51562 0.582,-0.51562 l 1.6797,0 c 0.3915,0 0.5938,0.10476 0.5938,0.50586 0,0.3342 -0.1815,0.51562 -0.5157,0.51562 l -0.076,0 0,1.10743 0,0.0566 c 0,0.1718 -0.01,0.22822 -0.1621,0.32422 -0.2579,0.1528 -1.0513,0.40234 -2.0157,0.40234 -1.6424,0 -2.7402,-1.19331 -2.7402,-2.91211 0,-1.6328 1.1163,-2.91211 2.7109,-2.91211 z m -13.332,0.15234 0,0 1.9277,0 c 1.5373,0 2.3105,0.60182 2.3105,1.72852 0,1.1936 -0.7732,1.82422 -2.3105,1.82422 l -0.793,0 0,0.95312 0.4668,0 c 0.382,0 0.5742,0.12396 0.5742,0.50586 0,0.382 -0.1922,0.51563 -0.5742,0.51563 l -1.6035,0 c -0.3819,0 -0.5723,-0.13363 -0.5723,-0.51563 0,-0.3246 0.181,-0.50586 0.4961,-0.50586 l 0.076,0 0,-3.47461 -0.068,0 c -0.3247,0 -0.5058,-0.18142 -0.5058,-0.51562 0,-0.3724 0.1923,-0.51563 0.5742,-0.51563 z m 5.459,0 0.7637,0 0.039,0 c 0.2674,0 0.3619,0.01 0.5528,0.36329 l 1.7773,3.23632 0,-2.56836 -0.2578,0 c -0.382,0 -0.5723,-0.13372 -0.5723,-0.51562 0,-0.382 0.1903,-0.51563 0.5723,-0.51563 l 1.3281,0 c 0.3819,0 0.5723,0.13363 0.5723,0.51563 0,0.3342 -0.1812,0.51562 -0.5059,0.51562 l -0.066,0 0,4.23047 c 0,0.2772 -0.029,0.33399 -0.2578,0.33399 l -0.4688,0 c -0.2197,0 -0.3541,-0.01 -0.4687,-0.21094 l -1.9375,-3.4082 0,2.52929 0.2578,0 c 0.3819,0 0.5723,0.12396 0.5723,0.50586 0,0.382 -0.1904,0.51563 -0.5723,0.51563 l -1.3281,0 c -0.3819,0 -0.5723,-0.13363 -0.5723,-0.51563 0,-0.3246 0.181,-0.50586 0.4961,-0.50586 l 0.076,0 0,-3.47461 -0.066,0 c -0.3247,0 -0.5059,-0.18142 -0.5059,-0.51562 0,-0.3724 0.1904,-0.51563 0.5723,-0.51563 z m -4.3223,1.06836 0,1.4336 0.6602,0 c 0.7352,0 1.1074,-0.25867 1.1074,-0.72657 0,-0.4679 -0.3722,-0.70703 -1.1074,-0.70703 l -0.6602,0 z"
              color="#000"
              fontFamily="sans-serif"
              fontWeight="400"
              overflow="visible"
              transform="translate(0 1004.362)"
            ></path>
          </g>
        </svg>
      );
    } else if (fileType.startsWith("image/jpeg")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          id="jpeg"
        >
          <g display="none">
            <rect
              width="48"
              height="48"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
          </g>
          <g transform="translate(-1097 -1310.362)">
            <path
              fill="#056F67"
              d="m 1123,1312.3622 c -0.554,0 -1,0.446 -1,1 l 0,1 c 0,0.554 0.446,1 1,1 l 10.0039,0 0.016,6.4844 c 0,0.8253 0.6708,1.4938 1.4961,1.4961 l 6.4844,0.017 0,28.502 c 0,0.8569 -0.6431,1.5 -1.5,1.5 l -23,0 c -0.857,0 -1.5,-0.6431 -1.5,-1.5 l 0,-1.5 c 0,-0.554 -0.446,-1 -1,-1 l -1,0 c -0.554,0 -1,0.446 -1,1 l 0,1.5 c 0,2.4671 2.0329,4.5 4.5,4.5 l 23,0 c 2.467,0 4.5,-2.0329 4.5,-4.5 l 0,-30.4863 c -10e-5,-0.3978 -0.1582,-0.7793 -0.4395,-1.0606 l -7.5137,-7.5136 c -0.2812,-0.2814 -0.6627,-0.4394 -1.0605,-0.4395 z m -11,21 c 0,0.554 0.446,1 1,1 l 1,0 c 0.554,0 1,-0.446 1,-1 l 0,-10 c 0,-0.554 -0.446,-1 -1,-1 l -1,0 c -0.554,0 -1,0.446 -1,1 z"
              color="#000"
              fontFamily="sans-serif"
              fontWeight="400"
              overflow="visible"
            ></path>
            <path
              fill="#056F67"
              d="m 1116.5,308 c -2.467,0 -4.5,2.0329 -4.5,4.5 l 0,2.5 c 0,0.554 0.446,1 1,1 l 1,0 c 0.554,0 1,-0.446 1,-1 l 0,-2.5 c 0,-0.8569 0.6431,-1.5 1.5,-1.5 l 2.5,0 c 0.554,0 1,-0.446 1,-1 l 0,-1 c 0,-0.554 -0.446,-1 -1,-1 l -2.5,0 z m -15.5,24 c -1.108,0 -2,0.892 -2,2 l 0,7 c 0,1.108 0.892,2 2,2 l 25,0 c 1.108,0 2,-0.892 2,-2 l 0,-7 c 0,-1.108 -0.892,-2 -2,-2 l -25,0 z m 20.9395,2.58789 c 0.4482,0 0.8783,0.10469 1.3359,0.30469 0.1146,-0.21 0.2196,-0.29492 0.4297,-0.29492 0.296,0 0.4297,0.12429 0.4297,0.52539 l 0.01,1.21093 c 0,0.401 -0.095,0.54493 -0.4863,0.54493 -0.2865,0 -0.4003,-0.14346 -0.4863,-0.43946 -0.1528,-0.5443 -0.4297,-0.83007 -1.1172,-0.83007 -0.9453,0 -1.4805,0.64932 -1.4805,1.89062 0,1.2413 0.5726,1.91992 1.5274,1.91992 0.2387,0 0.5353,-0.0591 0.8886,-0.16406 l 0,-0.72461 -0.5254,0 c -0.3915,0 -0.582,-0.12413 -0.582,-0.51563 0,-0.39149 0.1905,-0.51562 0.582,-0.51562 l 1.6797,0 c 0.3914,0 0.5918,0.10476 0.5918,0.50586 0,0.3342 -0.1814,0.51562 -0.5156,0.51562 l -0.076,0 0,1.10743 0,0.0566 c 0,0.1718 -0.01,0.22822 -0.1621,0.32422 -0.2578,0.1528 -1.0492,0.40234 -2.0136,0.40234 -1.6423,0 -2.7403,-1.19331 -2.7403,-2.91211 0,-1.6328 1.1164,-2.91211 2.711,-2.91211 z m -13.3301,0.15234 1.9277,0 c 1.5374,0 2.3106,0.60182 2.3106,1.72852 0,1.1936 -0.7732,1.82422 -2.3106,1.82422 l -0.791,0 0,0.95312 0.4668,0 c 0.3819,0 0.5723,0.12396 0.5723,0.50586 0,0.382 -0.1904,0.51563 -0.5723,0.51563 l -1.6035,0 c -0.382,0 -0.5742,-0.13363 -0.5742,-0.51563 0,-0.3246 0.1829,-0.50586 0.498,-0.50586 l 0.076,0 0,-3.47461 -0.068,0 c -0.3247,0 -0.5058,-0.18142 -0.5058,-0.51562 0,-0.3724 0.1922,-0.51563 0.5742,-0.51563 z m 5.541,0 0,0 3.8184,0 c 0.392,0 0.4863,0.095 0.4863,0.42969 l 0,1.04102 c 0,0.4011 -0.1237,0.59179 -0.4961,0.59179 -0.382,0 -0.5058,-0.20029 -0.5058,-0.59179 l 0,-0.48828 -2.168,0 0,1.19336 0.8125,0 0,-0.0566 c 0,-0.3533 0.1615,-0.5254 0.4766,-0.5254 0.3533,0 0.4863,0.19249 0.4863,0.58399 l 0,0.96289 c 0,0.3915 -0.1233,0.58398 -0.4766,0.58398 -0.3151,0 -0.4785,-0.16384 -0.4785,-0.49804 l 0,-0.0859 -0.8203,0 0,1.39453 2.168,0 0,-0.55469 c 0,-0.401 0.1334,-0.58203 0.5058,-0.58203 0.3819,0 0.4961,0.19053 0.4961,0.58203 l 0,1.12696 c 0,0.3341 -0.095,0.41992 -0.4863,0.41992 l -3.8203,0 c -0.3819,0 -0.5723,-0.13363 -0.5723,-0.51563 0,-0.3246 0.181,-0.50586 0.4961,-0.50586 l 0.076,0 0,-3.47461 -0.066,0 c -0.3247,0 -0.5078,-0.18142 -0.5078,-0.51562 0,-0.3724 0.1923,-0.51563 0.5742,-0.51563 z m -9.8242,0.01 2.3769,0 c 0.3915,0 0.5918,0.10476 0.5918,0.50586 0,0.3915 -0.2003,0.50586 -0.5918,0.50586 l -0.3926,0 0,2.58789 0,0.0859 c 0,0.5634 -0.01,1.01084 -0.3535,1.40234 -0.3246,0.3724 -0.9249,0.57422 -1.7461,0.57422 -0.592,0 -1.1184,-0.10488 -1.6054,-0.33399 -0.2487,-0.1146 -0.3418,-0.24916 -0.3418,-0.72656 l 0,-0.96484 c 0,-0.4965 0.1226,-0.71484 0.5332,-0.71484 0.4679,0 0.4207,0.36283 0.4687,0.77343 0.067,0.6302 0.22,0.93555 0.8789,0.93555 0.7734,0 0.9532,-0.41099 0.9532,-1.30859 l 0,-2.30079 -0.7715,0 c -0.3915,0 -0.5938,-0.12412 -0.5938,-0.51562 0,-0.3915 0.2023,-0.50586 0.5938,-0.50586 z m 5.4179,1.05859 0,1.4336 0.6602,0 c 0.7352,0 1.1074,-0.25867 1.1074,-0.72657 0,-0.4679 -0.3722,-0.70703 -1.1074,-0.70703 l -0.6602,0 z"
              color="#000"
              fontFamily="sans-serif"
              fontWeight="400"
              overflow="visible"
              transform="translate(0 1004.362)"
            ></path>
          </g>
        </svg>
      );
    } else if (fileType.startsWith("video/")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          id="mp"
        >
          <g display="none">
            <rect
              width="48"
              height="48"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
          </g>
          <g transform="translate(-265 -1510.362)">
            <path
              fill="#056F67"
              d="m 291,1512.3622 c -0.554,0 -1,0.446 -1,1 l 0,1 c 0,0.554 0.446,1 1,1 l 10.0039,0 0.016,6.4844 c 0,0.8253 0.6708,1.4938 1.4961,1.4961 l 6.4844,0.017 0,28.502 c 0,0.8569 -0.6431,1.5 -1.5,1.5 l -23,0 c -0.857,0 -1.5,-0.6431 -1.5,-1.5 l 0,-1.5 c 0,-0.554 -0.446,-1 -1,-1 l -1,0 c -0.554,0 -1,0.446 -1,1 l 0,1.5 c 0,2.4671 2.0329,4.5 4.5,4.5 l 23,0 c 2.467,0 4.5,-2.0329 4.5,-4.5 l 0,-30.4863 c -1e-4,-0.3978 -0.1582,-0.7793 -0.4395,-1.0606 l -7.5137,-7.5136 c -0.2812,-0.2814 -0.6627,-0.4394 -1.0605,-0.4395 z m -11,21 c 0,0.554 0.446,1 1,1 l 1,0 c 0.554,0 1,-0.446 1,-1 l 0,-10 c 0,-0.554 -0.446,-1 -1,-1 l -1,0 c -0.554,0 -1,0.446 -1,1 z"
              color="#000"
              fontFamily="sans-serif"
              fontWeight="400"
              overflow="visible"
            ></path>
            <path
              fill="#056F67"
              d="m 284.5,508 c -2.467,0 -4.5,2.0329 -4.5,4.5 l 0,2.5 c 0,0.554 0.446,1 1,1 l 1,0 c 0.554,0 1,-0.446 1,-1 l 0,-2.5 c 0,-0.8569 0.6431,-1.5 1.5,-1.5 l 2.5,0 c 0.554,0 1,-0.446 1,-1 l 0,-1 c 0,-0.554 -0.446,-1 -1,-1 l -2.5,0 z M 269,532 c -1.10801,0 -2,0.892 -2,2 l 0,7 c 0,1.108 0.89199,2 2,2 l 25,0 c 1.10801,0 2,-0.892 2,-2 l 0,-7 c 0,-1.108 -0.89199,-2 -2,-2 l -25,0 z m 18.78906,2.24219 c 0.0382,0 0.085,0.01 0.13282,0.0195 l 0.83007,0.14258 c 0.0954,0.019 0.14453,0.097 0.14453,0.24023 l 0,3.29297 c 0.0286,0.01 0.0475,0.01 0.0762,0.01 0.18142,0 0.24804,-0.23829 0.41992,-0.23829 0.24827,0 0.41992,0.13435 0.41992,0.37305 0,0.057 -0.0102,0.12464 -0.0293,0.18164 l -0.10351,0.34375 c -0.0382,0.1339 -0.12414,0.19141 -0.25781,0.19141 l -0.5254,0 0,0.58203 0.27735,0 c 0.3915,0 0.59179,0.11502 0.59179,0.44922 10e-6,0.3342 -0.20029,0.4375 -0.59179,0.4375 l -1.96875,0 c -0.39149,0 -0.58203,-0.1033 -0.58203,-0.4375 0,-0.3342 0.19054,-0.44922 0.58203,-0.44922 l 0.67969,0 0,-0.58203 -2.14844,0 c -0.15277,0 -0.25,-0.096 -0.25,-0.28711 l 0,-0.28711 c 0,-0.1528 6.4e-4,-0.2758 0.11523,-0.4668 l 1.95703,-3.33398 c 0.0764,-0.1334 0.12543,-0.18164 0.23047,-0.18164 z m -13.88476,0.49804 0.72461,0 c 0.32465,0 0.50673,0.1428 0.63086,0.4961 l 0.91601,2.64453 0.88867,-2.64453 c 0.12413,-0.3533 0.30425,-0.4961 0.62891,-0.4961 l 0.72656,0 c 0.40104,0 0.5918,0.13363 0.5918,0.51563 0,0.3342 -0.18143,0.51562 -0.51563,0.51562 l -0.0762,0 0.13281,3.47461 0.0781,0 c 0.33421,0 0.50586,0.17176 0.50586,0.50586 0,0.3916 -0.19249,0.51563 -0.58399,0.51563 l -1.04882,0 c -0.3915,0 -0.58399,-0.12403 -0.58399,-0.51563 0,-0.3341 0.17361,-0.50586 0.50781,-0.50586 l 0.0762,0 -0.0684,-2.8457 -0.6875,2.12109 c -0.10503,0.3247 -0.28624,0.44922 -0.5918,0.44922 -0.30556,0 -0.48676,-0.12452 -0.5918,-0.44922 l -0.67773,-2.12109 -0.0664,2.8457 0.0762,0 c 0.33421,0 0.50586,0.17176 0.50586,0.50586 0,0.3916 -0.19053,0.51563 -0.58203,0.51563 l -1.05078,0 c -0.39149,0 -0.58203,-0.12403 -0.58203,-0.51563 0,-0.3341 0.17166,-0.50586 0.50586,-0.50586 l 0.0762,0 0.13477,-3.47461 -0.0781,0 c -0.33421,0 -0.51562,-0.18142 -0.51562,-0.51562 0,-0.382 0.19271,-0.51563 0.59375,-0.51563 z m 6.24023,0 1.92774,0 c 1.53734,0 2.31054,0.60182 2.31054,1.72852 0,1.1936 -0.7732,1.82422 -2.31054,1.82422 l -0.79102,0 0,0.95312 0.4668,0 c 0.38195,0 0.57226,0.12406 0.57226,0.50586 0,0.3821 -0.19031,0.51563 -0.57226,0.51563 l -1.60352,0 c -0.38195,0 -0.57422,-0.13353 -0.57422,-0.51563 0,-0.3245 0.18294,-0.50586 0.49805,-0.50586 l 0.0762,0 0,-3.47461 -0.0664,0 c -0.32465,0 -0.50781,-0.18142 -0.50781,-0.51562 0,-0.3724 0.19227,-0.51563 0.57422,-0.51563 z m 7.74024,0.6211 -1.46094,2.57812 1.46094,0 0,-2.57812 z m -6.60352,0.44726 0,1.4336 0.6582,0 c 0.73525,0 1.10743,-0.25867 1.10743,-0.72657 -10e-6,-0.4679 -0.37218,-0.70703 -1.10743,-0.70703 l -0.6582,0 z"
              color="#000"
              fontFamily="sans-serif"
              fontWeight="400"
              overflow="visible"
              transform="translate(0 1004.362)"
            ></path>
          </g>
        </svg>
      );
    } else if (fileType === "application/pdf") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          id="pdf"
        >
          <g display="none">
            <rect
              width="48"
              height="48"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="57.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="117.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="173.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-46.987"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
            <rect
              width="48"
              height="48"
              x="-102.987"
              y="231.592"
              fill="#fff"
              color="#000"
              overflow="visible"
            ></rect>
          </g>
          <g transform="translate(-123 -1260.362)">
            <path
              fill="#056F67"
              d="m 149,1262.3622 c -0.554,0 -1,0.446 -1,1 l 0,1 c 0,0.554 0.446,1 1,1 l 10.0039,0 0.016,6.4844 c 0,0.8253 0.6708,1.4938 1.4961,1.4961 l 6.4844,0.017 0,28.502 c 0,0.8569 -0.6431,1.5 -1.5,1.5 l -23,0 c -0.857,0 -1.5,-0.6431 -1.5,-1.5 l 0,-1.5 c 0,-0.554 -0.446,-1 -1,-1 l -1,0 c -0.554,0 -1,0.446 -1,1 l 0,1.5 c 0,2.4671 2.0329,4.5 4.5,4.5 l 23,0 c 2.467,0 4.5,-2.0329 4.5,-4.5 l 0,-30.4863 c -1e-4,-0.3978 -0.1582,-0.7793 -0.4395,-1.0606 l -7.5137,-7.5136 c -0.2812,-0.2814 -0.6627,-0.4394 -1.0605,-0.4395 z m -11,21 c 0,0.554 0.446,1 1,1 l 1,0 c 0.554,0 1,-0.446 1,-1 l 0,-10 c 0,-0.554 -0.446,-1 -1,-1 l -1,0 c -0.554,0 -1,0.446 -1,1 z"
              color="#000"
              fontFamily="sans-serif"
              fontWeight="400"
              overflow="visible"
            ></path>
            <path
              fill="#056F67"
              d="m 142.5,258 c -2.467,0 -4.5,2.0329 -4.5,4.5 l 0,2.5 c 0,0.554 0.446,1 1,1 l 1,0 c 0.554,0 1,-0.446 1,-1 l 0,-2.5 c 0,-0.8569 0.6431,-1.5 1.5,-1.5 l 2.5,0 c 0.554,0 1,-0.446 1,-1 l 0,-1 c 0,-0.554 -0.446,-1 -1,-1 l -2.5,0 z M 127,282 c -1.10801,0 -2,0.892 -2,2 l 0,7 c 0,1.108 0.89199,2 2,2 l 25,0 c 1.10801,0 2,-0.892 2,-2 l 0,-7 c 0,-1.108 -0.89199,-2 -2,-2 l -25,0 z m 4.96484,2.74023 1.92969,0 c 1.53734,0 2.31055,0.60182 2.31055,1.72852 0,1.1936 -0.77321,1.82422 -2.31055,1.82422 l -0.79297,0 0,0.95312 0.46875,0 c 0.38195,0 0.57227,0.12396 0.57227,0.50586 0,0.382 -0.19032,0.51563 -0.57227,0.51563 l -1.60547,0 c -0.38195,0 -0.57226,-0.13363 -0.57226,-0.51563 0,-0.3246 0.18098,-0.50586 0.49609,-0.50586 l 0.0762,0 0,-3.47461 -0.0664,0 c -0.32466,0 -0.50586,-0.18142 -0.50586,-0.51562 0,-0.3724 0.19031,-0.51563 0.57226,-0.51563 z m 5.54493,0 0.87695,0 0.27734,0 c 0.88803,0 1.62435,0.02 2.19727,0.36329 0.73525,0.4488 1.16406,1.28888 1.16406,2.39648 0,1.1554 -0.48762,2.04312 -1.31836,2.48242 -0.48699,0.2674 -1.08832,0.28516 -1.79492,0.28516 l -0.52539,0 -0.87695,0 c -0.3915,0 -0.5918,-0.12413 -0.5918,-0.51563 0,-0.3342 0.18141,-0.50586 0.51562,-0.50586 l 0.0762,0 0,-3.47461 -0.0762,0 c -0.33421,0 -0.51562,-0.18142 -0.51562,-0.51562 0,-0.382 0.19075,-0.51563 0.5918,-0.51563 z m 5.79101,0 3.82031,0 c 0.39148,0 0.48633,0.095 0.48633,0.42969 l 0,1.04102 c 0,0.4011 -0.13346,0.59179 -0.50586,0.59179 -0.38195,0 -0.49609,-0.20029 -0.49609,-0.59179 l 0,-0.48828 -2.16797,0 0,1.19336 0.81055,0 0,-0.0566 c 0,-0.3533 0.1634,-0.5254 0.47851,-0.5254 0.3533,0 0.47656,0.19249 0.47656,0.58399 l 0,0.96289 c 0,0.3915 -0.12326,0.58398 -0.47656,0.58398 -0.31511,0 -0.47851,-0.16384 -0.47851,-0.49804 l 0,-0.0859 -0.81055,0 0,1.36523 0.25781,0 c 0.38194,0 0.57227,0.12396 0.57227,0.50586 0,0.382 -0.19033,0.51563 -0.57227,0.51563 l -1.39453,0 c -0.38195,0 -0.57226,-0.13363 -0.57226,-0.51563 0,-0.3246 0.18099,-0.50586 0.49609,-0.50586 l 0.0762,0 0,-3.47461 -0.0664,0 c -0.32466,0 -0.50586,-0.18142 -0.50586,-0.51562 0,-0.3724 0.19031,-0.51563 0.57226,-0.51563 z m -4.3125,1.00196 c -0.0859,0 -0.17989,-4.4e-4 -0.27539,0.01 l 0,3.48438 c 0.0955,0.01 0.18168,0.01 0.26758,0.01 1.16494,0 1.70898,-0.55276 1.70898,-1.75586 0,-1.1745 -0.55532,-1.74804 -1.70117,-1.74804 z m -5.88672,0.0664 0,1.4336 0.65821,0 c 0.73525,0 1.10937,-0.25867 1.10937,-0.72657 0,-0.4679 -0.37412,-0.70703 -1.10937,-0.70703 l -0.65821,0 z"
              color="#000"
              fontFamily="sans-serif"
              fontWeight="400"
              overflow="visible"
              transform="translate(0 1004.362)"
            ></path>
          </g>
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="file"
          x="0"
          y="0"
          version="1.1"
          className="size-10"
          viewBox="0 0 16 16"
        >
          <path
            id="path7"
            d="M3.74 1.5c-.967 0-1.754.787-1.754 1.754v10.992c0 .967.787 1.754 1.754 1.754h7.992c.967 0 1.754-.787 1.754-1.754V5.771c0-.007-.006-.012-.007-.019a.244.244 0 0 0-.065-.158l-4-4a.246.246 0 0 0-.152-.067c-.023-.007-.044-.027-.069-.027H3.74zm0 .5h5.246v2.281c0 .96.78 1.74 1.739 1.74h2.261v8.225c0 .691-.564 1.254-1.254 1.254H3.74c-.69 0-1.254-.563-1.254-1.254V3.254C2.486 2.563 3.05 2 3.74 2Zm5.748.395 3.145 3.126h-1.908a1.24 1.24 0 0 1-1.237-1.24V2.395zm1.621 8.867-1.943 1.943-.695-.695-.354.353.871.873c.048.046.111.075.178.075.066 0 .13-.028.178-.075l2.12-2.12-.355-.354z"
          ></path>
        </svg>
      );
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-[12px] border border-[#EAECF0] p-3">
      <div className="flex flex-1 items-center gap-3">
        {/* Render appropriate icon */}
        {getFileIcon(file)}

        <div className="flex w-full flex-col">
          <p className="line-clamp-1 font-sans_medium text-base">
            {truncateAddr(file.name)}
          </p>
          <p className="flex items-center font-sans_light text-xs">
            <span>{formatBytes(file.size)}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-7"
          onClick={onRemove}
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}

function isFileWithPreview(file: File): file is File & { preview: string } {
  return "preview" in file && typeof file.preview === "string";
}
