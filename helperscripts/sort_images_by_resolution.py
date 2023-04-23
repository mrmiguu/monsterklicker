import os
from PIL import Image


def get_image_resolution(image_path):
    with Image.open(image_path) as img:
        return img.size


def get_pixel_count(image_resolution):
    return image_resolution[0] * image_resolution[1]


def sort_images_by_pixel_count(folder_path):
    image_files = [
        os.path.join(folder_path, file)
        for file in os.listdir(folder_path)
        if file.lower().endswith(".png")
    ]

    sorted_images = sorted(
        image_files,
        key=lambda img_path: get_pixel_count(get_image_resolution(img_path)),
    )

    return sorted_images


def main():
    folder_path = input("Enter the folder path containing PNG images: ")

    sorted_images = sort_images_by_pixel_count(folder_path)

    print("PNG images sorted by total pixel count (smallest to largest):")
    for img_path in sorted_images:
        img_size = get_image_resolution(img_path)
        print(
            f"{os.path.basename(img_path)} - {img_size[0]}x{img_size[1]} ({get_pixel_count(img_size)} pixels)"
        )


if __name__ == "__main__":
    main()
