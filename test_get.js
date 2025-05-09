import "dotenv/config"; 
// `.env.local`の環境変数を読み込む
import fetch from "node-fetch";
//node.jsでfetchを使うのに必要

const fetchAllUsers = async () => {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable`;
    //今からこのテーブルのこの情報にアクセスするよの情報。&{}の中身な.envファイルにかいたURLの部分のコピペ。rest/v1はレストAPIのバージョンのこと。

    console.log("リクエストURL：", url);
    //ここでURLが正しいか確認。

    const response =await fetch(url, {
        //fetchの中のurlは上で定義したurlが格納されてる。
        method:"GET",
        headers: {
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization": `Bearer${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTPエラー！ステータス：${response.status}`);
    }

    const data = await response.json();
    console.log("①取得したユーザー一覧：", data);
    //データをターミナルに表示したりエラーハンドリングを指定。
};

fetchAllUsers();
//ここで関数を実行する

const fetchSelectedColumns = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?select=id,username`, {
        method:"GET",
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization":`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-type":"application/json"
        }
    });

    const data = await response.json();
    console.log("②選択したカラムのみ:", data);
};

fetchSelectedColumns();

const fetchUserByName = async (username) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?username=eq.${username}&select=id,username`, {
        method:"get",
        headers: {
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization":`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-type":"application/json"
        }
    });

    const data = await response.json();
    console.log(`③ユーザー名「${username}」のデータ：`,data);
};

fetchUserByName("田中太郎");

const fetchSortedUsers = async (order = "desc") => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?select=id,username,created_at&order=created_at.${order}`,{
        method:"GET",
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization":`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type":"application/json"
        }
    });

    const data = await response.json();
    console.log(`④作成日時降順(${order})のユーザー一覧：`,data);
};

fetchSortedUsers("desc");