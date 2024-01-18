"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [result, setResult] = useState();

  async function findAnswer(question) {
    await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: question,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        let response = Object.values(resData.choices);
        let onlyFirstResponse = response[0]?.message?.content;
        setResult(onlyFirstResponse);
        console.log(onlyFirstResponse);
      });
  }

  return (
    <main className={styles.main}>
      <button
        onClick={async () =>
          findAnswer(`Prepare a long article about "Koronavirüslü kişilerle temas edenler ne yapmalı?". Write in English and have at least 1000 words. Return with html tags in div format without style.`)
        }
      >
        Hit API
      </button>
      <div dangerouslySetInnerHTML={ {__html: result} } />
    </main>
  );
}
