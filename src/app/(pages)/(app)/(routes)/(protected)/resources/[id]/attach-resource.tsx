"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Upload } from "lucide-react";

export function AttachNewResource() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set initial file name
    }
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const mockUpload = async (file: File): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("File uploaded:", file.name);
        resolve();
      }, 2000); // Simulate a 2-second upload
    });
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      await mockUpload(file);
      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded.`,
        duration: 5000,
      });
      setIsOpen(false);
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-4 py-[10px] rounded-[36px]
        border border-neutral-200 text-primary-500 font-medium text-sm bg-transparent"
        >
          <Plus className="size-5 mr-2" />
          New upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Choose a file to upload to your resource library.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fileName" className="text-right">
              File Name
            </Label>
            <Input
              id="fileName"
              type="text"
              value={fileName}
              onChange={handleFileNameChange}
              className="col-span-3"
              placeholder="Enter file name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              File
            </Label>
            <Input
              id="file"
              type="file"
              className="col-span-3"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleUpload}
            disabled={!file || isUploading}
          >
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
