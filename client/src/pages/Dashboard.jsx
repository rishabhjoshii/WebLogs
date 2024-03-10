import React from 'react'

const Dashboard = () => {
  return (
    <div class="flex flex-col h-[80dvh] mb-[10px]  ">
            <section class="w-full h-full flex justify-center items-center  bg-with-image" >
                    <div class="space-y-3 text-center">
                        <h1 class=" text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">Exploring the World</h1>
                        <p class="text-[#5f5e5e] dark:text-gray-400">WebLogs - Share the experience !</p>
                        <p class="text-[#5f5e5e] dark:text-gray-400">A site that helps you in and out</p>
                    </div>
            </section>
            <div class="flex justify-center items-center mb-[30px] mt-[15px]">
                <h1 class="underline  text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">Featured Posts</h1>
            </div>
    </div>
  )
}

export default Dashboard