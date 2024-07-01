import React from 'react'

const Dashboard = () => {
  return (
    <div class="flex flex-col h-[97dvh] mb-[10px]  ">
            <section class="w-full h-full flex justify-center items-center  bg-with-image" >
                    <div class="space-y-3 text-center">
                        <h1 class=" text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">Exploring the World</h1>
                        <p class="text-[#5f5e5e] dark:text-gray-400">WebLogs - Share the experience !</p>
                        <p class="text-[#5f5e5e] dark:text-gray-400">A site that helps you in and out</p>
                    </div>
            </section>

            <div className='md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28'>
              <div>
                <h3 class="mb-4 text-4xl lg:text-6xl leading-tight">What features does WebLogs provide ?</h3>
              </div>
              <div>
                <div class="text-lg leading-relaxed mb-4">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid dubitas igitur mutare principia naturae? Ita multo sanguine profuso in laetitia et in victoria est mortuus. Omnia contraria, quos etiam insanos esse vultis. Hinc ceteri particulas arripere conati suam quisque videro voluit afferre sententiam. Quis non odit sordidos, vanos, leves, futtiles? Quasi ego id curem, quid ille aiat aut neget.</p>
                </div>
              </div>
            </div>

            <div class="flex justify-center items-center mb-[40px] mt-[30px] ">
                <h1 class="underline  text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">Featured Posts</h1>
            </div>
    </div>
  )
}

export default Dashboard