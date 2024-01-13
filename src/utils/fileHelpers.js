import fs from 'fs';

export const getSizeFile = (pathFile = null) => {
  try {
    const stats = fs.statSync(pathFile);

    const fileSizeInBytes = stats.size;

    const humanReadableFileSize = bytesToSize(fileSizeInBytes);
    return humanReadableFileSize
  } catch (err) {
    console.log(err.message);
  }
}

const bytesToSize = (bytes, decimals = 2) => {
  if (!Number(bytes)) {
    return '0 Bytes';
  }

  const kbToBytes = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];

  const index = Math.floor(
    Math.log(bytes) / Math.log(kbToBytes),
  );
  return {
    sizeType: sizes[index],
    volume: `${parseFloat(
      (bytes / Math.pow(kbToBytes, index)).toFixed(dm),
    )}`
  }
}