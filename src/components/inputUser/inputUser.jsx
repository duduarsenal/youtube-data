import { useState } from 'react';

export default function InputUser(props) {

    const [submitChannel, setSubmitChannel] = useState("@Duelista");

    return ( 
        <section className='w-[95%] lg:w-[50%] flex flex-col m-auto px-2 sm:px-8 gap-8 text-white'>
            <p className='px-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic officia dolorum eaque numquam in provident ducimus praesentium, itaque natus error. Facilis, ipsum! Quia, facere. Sit blanditiis dolore perferendis dignissimos nulla!</p>
            <div className='w-full flex flex-col md:flex-row gap-4 md:gap-8'>
                <input type="text" name="channelName" id="channelName" className='w-full min-h-[2.5rem] rounded-sm outline-none text-black text-[1.05rem] px-1' placeholder='VibedeDois ou https://youtube.com/@VibedeDois' onChange={(e) => setSubmitChannel(e.target.value)}/>
                <button type="submit" className='min-w-max min-h-[2.5rem] bg-blue-light py-2 px-4 rounded-sm hover:bg-blue-dark hover:scale-[1.02] transition-all duration-200' onClick={() => props.getSubmitChannel(submitChannel)}>Carregar Informações</button>
            </div>
        </section>
     );
}