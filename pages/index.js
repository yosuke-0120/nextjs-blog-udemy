import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getPostsData } from '../lib/post.js'

//SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData(); //id,title,date,thumbnail
  console.log( allPostsData);

  return {
    props:{
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps( context){
//   return {
//     props:{
//       //コンポーネントに渡すためのprpos
//     },
//   };
// }

export default function Home( {allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className={utilStyles.headingMd}>
          私は村田陽祐です。
        </p>
        <h2 className={utilStyles.headingMd}>📝エンジニアのブログ</h2>
      </section>
      <section>
        <div className={styles.grid}>
          { allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage}></img>
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
            ))
          }
        </div>
      </section>
    </Layout>
  )
}
