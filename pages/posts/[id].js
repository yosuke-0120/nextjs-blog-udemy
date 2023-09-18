import Layout from "../../components/Layout";
import { getAllPostIds,getPostData } from "../../lib/post";
import utilStyles from '../../styles/utils.module.css'
import Head from "next/head";

export async function getStaticPaths() {
  //ブログ投稿データのファイル名(id)を取得。
  const paths = getAllPostIds();

  return {
    paths, //どのパスが事前にレンダリングされるのか決める。
    fallback: false, //あとで説明。(falseにすると、上のpathsに含まれてないあらゆるパスはアクセスすると404ページになる。)
  };
  }

//SSG(id(ファイル名)に基づいて必要なデータを取得)
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id); //あとでasyncとawaitをつける。
  
    console.log("postData="+ postData);
    return {
      props: {
        postData,
      },
    };
  }

export default function Post( {postData} ) {
    console.log("postData.title=" + postData.title);
    return (
        <Layout>
          <Head>
            <title>{postData.title}</title>
          </Head>
          <article>
            <h1 className={utilStyles.headingX1}>
            {postData.title}
            </h1>
            <div className={utilStyles.lightText}>{postData.date}</div>
            <div dangerouslySetInnerHTML={ {__html: postData.contentHTML}} />
            </article>
        </Layout>
    );
}