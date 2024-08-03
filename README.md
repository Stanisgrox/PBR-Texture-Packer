# PBR Texture packer tool

Simple tool for packing monochrome images from PBR materials to single image for 3D rendering usage.

## Usage

1. Choose 1 to 3 images in File Input boxes. (Choose Red channel first.)
**Now with Drag & Drop support! You can drag images into boxes and drag your result image out of Application to quickly save it!**
2. Click "Generate" to preview your image on canvas.
3. Click "Save" and choose your output directory or just **drag** result image in preferable directory.

### Saving image via Drag & Drop:
![save image with d&d](https://github.com/Stanisgrox/PBR-Texture-Packer/blob/master/.github/demo.gif)

### Importing images via Drag & Drop:
![load image with d&d](https://github.com/Stanisgrox/PBR-Texture-Packer/blob/master/.github/demo2.gif)

### Where to use this images

In any 2D/3D software with RGB channel separation techniques.

## Pros of texture channel packing

It saves GPU memory,clears assets clutter and sometimes might save your Disc space (PNG compression isn't implemented yet).

## Known bugs and missing features (v1.0.2)

### Bugs
- Footer links are unclickable.
- Red channel must be populated otherwise it won't render.

### Missing features
- Autonaming for output files (impossible for Drag and Drop way of saving img)
- Logo

### May be implemented / not guaranteed
- Alpha Channel support
- MacOS and Linux support
- Lossless PNG compression for saving Hard Drive space

### Won't be implemented
- Redirect to source image file when saving (Security hazard)
