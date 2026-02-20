import NoImage from "/public/image/logo-tepcot.jpg";

export function getCoverImage(post) {
  return post?.acf?.cover_image || NoImage.src;
}