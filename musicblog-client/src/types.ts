import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface PostShort {
    id: number,
    attributes: {
      title: string;
      content: MDXRemoteSerializeResult;
      published_datetime: Date;
    }
    
  }
  
export interface Post {
    id: number,
    attributes: {
      title: string,
      content: string,
      published_datetime: Date,
    }
  }