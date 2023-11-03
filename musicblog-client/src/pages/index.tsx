import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header';
import Content from '@/components/Content/Content';
import Footer from '@/components/Footer/Footer';
import {Post as PostProps} from "@/types";
import Mainpage from './mainpage';



const Home = ({post} : {post : PostProps}) => {
  
  return (
    <div>
      <Header></Header>
      <Content post={post}></Content>
      <Footer></Footer>
    </div>
  )
}

export default Home;

