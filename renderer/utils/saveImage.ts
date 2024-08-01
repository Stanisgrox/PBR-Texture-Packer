//imagePath = canvas.toDataUrl()
export function saveImage (imagePath: string, imageName: string) {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.setAttribute('download', imageName + '.png');
    link.setAttribute('href', imagePath.replace("image/png", "image/octet-stream"));
    link.click();
}