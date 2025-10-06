import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ListView from "@/components/ListView";
import { loadTaskLists } from "@/lib/contentful/apis/tasksList-api";
import React from "react";

export default async function Page() {
  const taskLists = await loadTaskLists();

  return (
<div className="min-h-screen flex flex-col">
  <div className="max-w-7xl mx-auto w-full">
    <Header />
  </div>
  <main className="max-w-7xl mx-auto w-full flex-1 mt-5">
    


    <div className="flex flex-wrap gap-5 justify-center ml-4">
      {taskLists.map((list) => (
        <ListView key={list.id} taskList={list} />
      ))}
    </div>


  </main>
  <Footer />
</div>    


  );
}
