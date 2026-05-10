import imageCompression from "browser-image-compression";

export const optimizeImage = async ({
  file,
  convertToWebP = true,
  resize = false,
  width = 400,
  height = 400,
  quality = 0.8,
  fit = "cover",
}) => {
  try {
    let processedFile = file;

    // =====================
    // CONVERTIR / COMPRIMIR
    // =====================
    if (convertToWebP) {
      processedFile = await imageCompression(file, {
        useWebWorker: true,
        fileType: "image/webp",
        initialQuality: quality,
      });
    }

    // =====================
    // SI NO HAY RESIZE
    // =====================
    if (!resize) {
      const extension = convertToWebP ? "webp" : file.name.split(".").pop();

      const fileName = `${crypto.randomUUID()}.${extension}`;

      return new File([processedFile], fileName, {
        type: processedFile.type,
      });
    }

    // =====================
    // RESIZE
    // =====================
    const bitmap = await createImageBitmap(processedFile);

    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    const scale =
      fit === "cover"
        ? Math.max(width / bitmap.width, height / bitmap.height)
        : Math.min(width / bitmap.width, height / bitmap.height);

    const x = (width - bitmap.width * scale) / 2;
    const y = (height - bitmap.height * scale) / 2;

    ctx.drawImage(bitmap, x, y, bitmap.width * scale, bitmap.height * scale);

    const mimeType = convertToWebP ? "image/webp" : file.type;

    const extension = convertToWebP ? "webp" : file.name.split(".").pop();

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, mimeType, quality),
    );

    const fileName = `${crypto.randomUUID()}.${extension}`;

    return new File([blob], fileName, {
      type: mimeType,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
