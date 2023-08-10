import React from 'react';

export default function InputUser() {
    return ( 
        <section className='w-[50%] flex flex-col m-auto px-8 gap-8 text-white'>
            <p className='px-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic officia dolorum eaque numquam in provident ducimus praesentium, itaque natus error. Facilis, ipsum! Quia, facere. Sit blanditiis dolore perferendis dignissimos nulla!</p>
            <div className='w-full flex justify-between gap-8'>
                <input type="text" name="" id="" className='w-full rounded-sm outline-none text-black text-[1.05rem] px-1' placeholder='@Duelista or https://www.youtube.com/@Duelista'/>
                <button type="submit" className='min-w-max bg-[#E5383B] py-2 px-4 rounded-sm'>Carregar Informações</button>
            </div>
        </section>
     );
}