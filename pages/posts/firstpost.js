import Head from "next/head";
import Link from "next/link";

export default function FastPost() {
    return (
        <div>
            <Head>
                <title>最初の投稿</title>
            </Head>
            <h1>初めての投稿</h1>
            <Link href='/'>戻る</Link>
        </div>
    );
}