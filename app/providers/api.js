import {
  getDocument,
  getFunc,
  getStore,
} from "../components/functions";
import _ from "lodash";

export const getPosts = async (getData) => {
  let posts = [];
  getStore("Posts").onSnapshot((qss) => {
    qss.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    getData(posts);
    posts = [];
  });
};

export const getAuthor = async ({ id, getInfo }) => {
  const { data } = await getFunc("getAuthorInfo")({
    authorId: id,
  });
  const { providerData } = data;
  getInfo(providerData[0]);
};

export const getPost = async ({ id, getInfo }) => {
  const { _data } = await getDocument("Posts", id).get();
  getInfo(_data);
};

export const getReactor = async ({ id }) => {
  const { data } = await getFunc("getAuthorInfo")({
    authorId: id,
  });
  const { providerData } = data;
  return providerData[0];
};

export const orderComments = ({ meta }) => {
  return _.sortBy(meta, (mt) => new Date(mt.time).getTime()).reverse();
};

export const getAuthorPosts = async ({ id, getInfo }) => {
  let temp = [];
  getStore("Posts")
    .where("author", "==", id)
    .onSnapshot((qss) => {
      qss.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });

      const sortData = _.sortBy(temp, (tm) =>
        new Date(tm.datePosted.toDate()).getTime()
      );

      getInfo(sortData);
      temp = [];
    });
};

export const deletePost = async ({ id }) => {
  await getDocument("Posts", id).delete();
};

export const getAuthorComments = async ({ id, getInfo }) => {
  
  const {_docs}= await getStore("Posts").where('meta.commenters', "array-contains",id).get()
  getInfo(_docs)
  
};
