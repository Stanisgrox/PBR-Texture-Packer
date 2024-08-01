# PBR Texture packer tool

Simple tool for packing monochrome images from PBR materials to single image for 3D rendering usage.

## Usage

1. Choose 1 to 3 images in File Input boxes. (Choose Red channel first.)
2. Click "Generate" to preview your image on canvas.
3. Click "Save" and choose your output directory.

### Where to use this images

In any 3D software with RGB channel separation.

## Pros of texture channel packing

It saves GPU memory and clears assets clutter.

## Known bugs and missing features (v1.0.2)

### Bugs
- Footer links are unckickable.
- Red channel must be populated otherwise it won't render.

### Missing features
- Nicer interface
- Autonaming for output files
- Redirect to source image file when saving
- Logo

### May be implemented / not guaranteed
- Alpha Channel support
- MacOS and Linux support
- Lossless PNG compression for saving Hard Drive space