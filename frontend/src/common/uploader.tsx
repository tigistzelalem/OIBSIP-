import React from 'react';
import "@uploadthing/react/styles.css";
import { UploadButton } from '@/utlis/uploadthing';
// import { UploadButton } from "@/utils/uploadthing";


interface ImageUploaderProps {
    onImageUploadComplete: (res: any) => void; 
    onImageUploadError: (error: Error) => void;
}

console.log()

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploadComplete, onImageUploadError }) => {
    return (
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={onImageUploadComplete}
            onUploadError={onImageUploadError}
        />
    );
};

export default ImageUploader;
