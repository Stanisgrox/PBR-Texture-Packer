# PBR Texture packer tool

Simple tool for packing monochrome images from PBR materials to single image for 3D rendering usage.

## Usage

1. Choose 1 to 4 images in File Input boxes. (Choose Red channel first.)
**Now with Drag & Drop support! You can drag images into boxes and drag your result image out of Application to quickly save it!**
2. Click "Generate" to preview your image on canvas.
3. Click "Save" and choose your output directory or just **drag** result image in preferable directory.

**If Alpha channel isn't populated it will be set to full value**

### Saving image via Drag & Drop:
![save image with d&d](https://github.com/Stanisgrox/PBR-Texture-Packer/blob/master/.github/demo.gif)
Saving images bigger than 4096x4096 via drag and drop may be laggy or even impossible. If you have source files bigger than 4K use "Save" button!

### Importing images via Drag & Drop:
![load image with d&d](https://github.com/Stanisgrox/PBR-Texture-Packer/blob/master/.github/demo2.gif)
Importing images bigger than 4096x4096 takes some time.

### Where to use this images

In any 2D/3D software with RGB channel separation techniques.

## Pros of texture channel packing

It saves GPU memory,clears assets clutter and sometimes might save your Disc space (PNG compression isn't implemented yet).

Some tests performed in **Blender 4.1 Cycles**:
Source material (Albedo, _AO_, _Roughness_, _Specular_, _Displacement_, Normal) applied to 4 vertex plane and 12K HDRI env.

- 2K Unpacked total memory consumption: 2803 MB
- 2K Packed total memory consumption: 2744 MB (-1.7%)

- 8K Unpacked total memory consumption: 4243 MB
- 8K Packed total memory consumption: 3476 MB (-18%)

## Known bugs and missing features (v1.2.0)

### Bugs
- Footer links are unclickable.
- Red channel must be populated otherwise it won't render.

### Missing features
- Logo

### May be implemented / not guaranteed
- MacOS and Linux support
- Lossless PNG compression for saving Hard Drive space

### Won't be implemented
- Redirect to source image file when saving (Security hazard)

## Building and Contributing
### Building
git clone this repo and then
```powershell
npm i
```
To launch dev build use
```bash
npm run dev
```
And to build production build
```bash
npm run build
```
### Contributing

Contact me if you want to contribute. Feel free to fork this repo and opening issues in this repo.
