import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface PostShort {
  id: number,
  attributes: {
    title: string;
    content: MDXRemoteSerializeResult;
    published_datetime: Date;
    image: string;
  }
}
  
export interface Post {
  id: number,
  attributes: {
    title: string,
    content: MDXRemoteSerializeResult,
    published_datetime: Date,
    image: string
  }
}

export interface Biography {
  id: number,
  attributes: {
    title: string,
    content: MDXRemoteSerializeResult,
    image: string
  }
}

export interface Discography {
  id: number,
  attributes: {
    title: string,
    image: {
      data: {
        attributes: {
          url: string
        }
      }
    }
    songs: {
      data: Song[]
    }
  }
}

export interface Song {
  id: number,
  attributes: {
    title: string,
    video: {
      data: {
        attributes: {
          url: string
        }
      }
    }
    album: {
      data: {
        attributes: {
          title: string
        }
      }
    }
  }
}
