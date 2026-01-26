import NoImage from "/public/image/ce.jpg";

export function getCoverImage(post) {
  return post?.acf?.cover_image || NoImage.src;
}