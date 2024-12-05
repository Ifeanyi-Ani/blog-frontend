const ImageUpload = {
  uploadToCloudinary: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}`
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
  },

  handleImageUpload: async (
    file: File,
    insertImage: (imageUrl: string) => void,
    setIsUploading: (isUploading: boolean) => void
  ) => {
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await ImageUpload.uploadToCloudinary(file);
        insertImage(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsUploading(false);
      }
    }
  },
};

export default ImageUpload;
