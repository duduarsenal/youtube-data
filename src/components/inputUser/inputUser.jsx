import { useState } from 'react';

export default function InputUser(props) {

    const [submitChannel, setSubmitChannel] = useState("");

    return ( 
        <section className='w-[95%] lg:w-[50%] flex flex-col m-auto px-2 sm:px-8 gap-8 text-white'>
            <div>
                <p>"Coloca uma url ou nome de canal aqui vacilão" <small>by: Bustersky13</small></p>
                <p className='font-light'><strong>Exemplos:</strong> @Duelista, www.youtube.com/@Duelista, youtube.com/manualdomundo, www.youtube.com/channel/UCsOKnyaRi9-6bSyN6XT6vJg/</p>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-4 md:gap-8'>
                <input type="text" name="channelName" id="channelName" className='w-full min-h-[2.5rem] rounded-sm outline-none text-[black] text-[1.05rem] px-1' placeholder='VibedeDois ou https://youtube.com/@VibedeDois' onChange={(e) => setSubmitChannel(e.target.value)}/>
                <button type="submit" className='min-w-max min-h-[2.5rem] bg-blue-light py-2 px-4 rounded-sm hover:bg-blue-dark hover:scale-[1.02] transition-all duration-200' onClick={() => props.getSubmitChannel(submitChannel)}>Carregar Informações</button>
            </div>
        </section>
     );
}