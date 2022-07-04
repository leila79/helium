export default function PostMaker(post) {
  // console.log(post.post_images.slice(2, -1));
  if (post.author.profile_image) {
    return {
      userId: post.user_id,
      Id: post.id,
      publisher: post.author.first_name + " " + post.author.last_name || null,
      publisherPhoto: require("@/assets" + post.author.profile_image) || null,
      mainTitle: post.title.slice(1, -1),
      title: post.description.slice(1, -1),
      postPhoto1: require("@/assets" + post.post_images.slice(2, -1)),
      publishedDate: new Date(post.date).toLocaleDateString("fa-IR") || null,
      readingTime: post.reading_time || null,
      tags: (post.tags.length > 0 ? post.tags : []) || null,
      like_number: post.like_number || null,
      wrapped: false,
      bookMarked: post.is_bookmarked || false,
      isFollowing: post.is_following || false,
      isUserPost: post.user_post || false,
      comment_number: post.comment_number || null,
      isLiked: post.is_liked || false,
    };
  } else {
    return {
      userId: post.user_id,
      Id: post.id,
      publisher: post.author.first_name + " " + post.author.last_name || null,
      // publisherPhoto: null,
      mainTitle: post.title.slice(1, -1),
      title: post.description.slice(1, -1),
      postPhoto1: require("@/assets" + post.post_images.slice(2, -1)),
      publishedDate: new Date(post.date).toLocaleDateString("fa-IR") || null,
      readingTime: post.reading_time || null,
      tags: (post.tags.length > 0 ? post.tags : []) || null,
      like_number: post.like_number || null,
      wrapped: false,
      bookMarked: post.is_bookmarked || false,
      isFollowing: post.is_following || false,
      isUserPost: post.user_post || false,
      comment_number: post.comment_number || null,
      isLiked: post.is_liked || false,
    };
  }
}

export function relativePostMaker(post) {
  return {
    id: post.id,
    title: post.title.slice(1, -1),
    post_image: require("@/assets" + post.post_images.slice(2, -1)),
    date: new Date(post.date).toLocaleDateString("fa-IR") || null,
    reading_time: post.reading_time,
    tags: post.tags.length > 0 ? post.tags : [],
    wrapped: false,
    bookMarked: post.is_bookmarked || false,
    isFollowing: post.is_following || false,
    isUserPost: post.user_post || false,
  };
}

export function ArticlePostMaker(post) {
  return {
    Id: post.id,
    userId: post.user_id,
    publisher: post.author.first_name + " " + post.author.last_name,
    publisherPhoto: require("@/assets" + post.author.profile_image),
    mainTitle: post.title.slice(1, -1),
    title: post.title.slice(1, -1),
    textPost1: post.description.slice(1, -1),
    postPhoto1: require("@/assets" + post.post_images.slice(2, -1)),
    publishedDate: new Date(post.date).toLocaleDateString("fa-IR") || null,
    readingTime: post.reading_time,
    tags: post.tags.length > 0 ? post.tags : [],
    isFollowing: post.is_following || false,
    bookMarked: post.is_bookmarked || false,
    like_number: post.like_number,
    isUserPost: post.user_post || false,
    isLiked: post.is_liked || false,
  };
}
