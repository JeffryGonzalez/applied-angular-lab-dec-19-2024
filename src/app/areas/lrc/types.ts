export type PostApiResponseItem = {
  id: string;
  name: string;
  description: string;
  link: string;
  datePosted: string;
  postedBy: string;
};

export type PostApiResponse = PostApiResponseItem[];

// export type PostCreateModel = {
//   name: string;
//   description: string;
//   link: string;
// }

export type PostCreateModel = Pick<
  PostApiResponseItem,
  'name' | 'description' | 'link'
>;
