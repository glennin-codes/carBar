

 export const clearMemory = (req: any, res: any) => {
    for (const file of req.files) {
      if (file.buffer) {
        // Free up the memory used by the uploaded file
        file.buffer = null;
      }
    }
  };
 